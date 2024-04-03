import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import {
  FaEllipsisV,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhoneAlt,
  FaPhoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StringParam, useQueryParam } from "use-query-params";

import loader from "../assets/loader.svg";
import { IconButton } from "./common/Buttons";
import FlexBox from "./common/Flexbox";
import { Modal } from "./common/Modal";
import { Subtitle, Title } from "./common/Typography";
import {
  ERROR,
  SUCCESS,
  THEME_BG_PRIMARY,
  THEME_COLOR_PRIMARY,
} from "./common/colors";

const Container = styled.div`
  height: 100dvh;
  width: 100dvw;
`;

const VideoContainer = styled.div`
  height: 100dvh;
  width: 100dvw;
  background-color: transparent;
  position: relative;
`;

const SelfVideo = styled.video`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: 0.5rem;
  height: 15rem;
  width: 15rem;
  z-index: 1;
  object-fit: cover;
  @media screen and (max-width: 767px) {
    height: 10rem;
    width: 7rem;
  }
`;

const RemoteVideo = styled.video`
  height: 100dvh;
  width: 100dvw;
  object-fit: cover;
  position: absolute;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  z-index: 1;
`;

const RoomInfo = styled(FlexBox)`
  padding: 1rem;
  @media screen and (max-width: 767px) {
    min-width: 20rem;
  }
`;

const ModalHeader = styled(FlexBox)`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${THEME_BG_PRIMARY};
`;

const ClickToCopy = styled.span`
  color: ${THEME_COLOR_PRIMARY};
  cursor: pointer;
  text-decoration: underline;
`;

const LoadingScreen = styled(FlexBox)`
  height: 100dvh;
  width: 100dvw;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: white;
`;

const LoadingWrapper = styled(FlexBox)`
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 8rem;
`;

const Room = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [incomingCall, setIncomingCall] = useState(false);
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const [remoteUserId, setRemoteUserId] = useState("");
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const streamRef = useRef(null);
  const currentCallRef = useRef(null);

  const navigate = useNavigate();

  const [roomId] = useQueryParam("roomId", StringParam);

  useEffect(() => {
    setIsLoading(true);

    const peer = new Peer();
    peer.on("open", (id) => {
      setPeerId(id);
      setIsLoading(false);
      if (!roomId) {
        toggleShowRoomInfo();
      }
    });
    peer.on("call", (call) => {
      currentCallRef.current = call;
      setIncomingCall(true);
    });

    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        setRemoteUserId(data);
      });
    });
    peerInstance.current = peer;
  }, []);

  useEffect(() => {
    if (!roomId || !peerId) return;
    if (roomId && peerId) {
      handleCall(roomId);
    }
  }, [roomId, peerId]);

  const handleCall = (roomId) => {
    const currentUserName = localStorage.getItem("userData");

    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia(
      { video: videoEnabled, audio: audioEnabled },
      (mediaStream) => {
        streamRef.current = mediaStream;
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.play();

        const dataConnection = peerInstance.current.connect(roomId);
        dataConnection.on("open", () => {
          // Send current username to remote peer
          dataConnection.send(currentUserName);
        });

        const call = peerInstance.current.call(roomId, mediaStream);
        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
        call.on("close", () => {
          handleDisconnectCall();
        });
        currentCallRef.current = call;
      }
    );
  };

  const handleIncomingCall = (accept = false) => {
    if (accept) {
      const getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia(
        { video: videoEnabled, audio: audioEnabled },
        (mediaStream) => {
          streamRef.current = mediaStream;
          currentCallRef.current.answer(mediaStream);
          localVideoRef.current.srcObject = mediaStream;
          localVideoRef.current.play();
        }
      );
      currentCallRef.current.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
      currentCallRef.current.on("close", () => {
        handleDisconnectCall();
      });
    } else {
      currentCallRef.current.close();
    }
    setIncomingCall(false);
  };

  const handleToggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    streamRef.current.getVideoTracks()[0].enabled = !videoEnabled;
  };

  const handleToggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    streamRef.current.getAudioTracks()[0].enabled = !audioEnabled;
  };

  const handleDisconnectCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (currentCallRef.current) {
      currentCallRef.current.close();
    }
    peerInstance.current.destroy();
    navigate("/dashboard", { replace: true });
  };

  const toggleShowRoomInfo = () => {
    setShowRoomInfo(!showRoomInfo);
  };

  const clickToCopy = () => {
    navigator.clipboard
      .writeText(`http://127.0.0.1:5173/room?roomId=${peerId}`)
      .then(() => {
        alert("Room url copied to clipboard");
      })
      .catch(() => {
        alert("Could not copy the room url");
      });
  };

  return (
    <Container>
      {isLoading && (
        <LoadingScreen>
          <LoadingWrapper>
            <img src={loader} height="100%" width="100%" />
          </LoadingWrapper>
        </LoadingScreen>
      )}
      {incomingCall && (
        <Modal
          XS
          height="fit-content"
          minWidth="fit-content"
          borderRadius={"0.5rem"}
        >
          <RoomInfo column rowGap="1rem">
            <ModalHeader width="100%" justify="space-between" align="center">
              <Title fontWeight="bold" fontSize="1rem">
                Incoming Call
              </Title>
              <FiX
                color={THEME_BG_PRIMARY}
                onClick={() => setIncomingCall(false)}
                cursor={"pointer"}
              />
            </ModalHeader>
            <FlexBox column rowGap="0.5rem">
              <Subtitle>{remoteUserId} wants to join the room</Subtitle>
            </FlexBox>
            <FlexBox width="100%" justify="space-between">
              <IconButton
                height="3rem"
                width="3rem"
                iconSize="1.25rem"
                bgColor={SUCCESS}
                borderRadius="50%"
                Icon={FaPhoneAlt}
                onClick={() => handleIncomingCall(true)}
              >
                Accept
              </IconButton>
              <IconButton
                height="3rem"
                width="3rem"
                iconSize="1.25rem"
                bgColor={ERROR}
                borderRadius="50%"
                Icon={FaPhoneSlash}
                onClick={handleIncomingCall}
              >
                Decline
              </IconButton>
            </FlexBox>
          </RoomInfo>
        </Modal>
      )}
      {showRoomInfo && (
        <Modal
          XS
          height="fit-content"
          minWidth="fit-content"
          borderRadius={"0.5rem"}
        >
          <RoomInfo column rowGap="1rem">
            <ModalHeader width="100%" justify="space-between" align="center">
              <Title fontWeight="bold" fontSize="1rem">
                Room Information
              </Title>
              <FiX
                color={THEME_BG_PRIMARY}
                onClick={toggleShowRoomInfo}
                cursor={"pointer"}
              />
            </ModalHeader>
            <FlexBox column rowGap="0.5rem">
              <Subtitle>Room id: {peerId}</Subtitle>
              <Subtitle>
                <ClickToCopy onClick={clickToCopy}>Click here</ClickToCopy> to
                copy the room url
              </Subtitle>
            </FlexBox>
          </RoomInfo>
        </Modal>
      )}
      <VideoContainer>
        <SelfVideo ref={localVideoRef} autoPlay muted />
        <RemoteVideo ref={remoteVideoRef} autoPlay />
        <ButtonContainer>
          <IconButton
            bgC
            borderRadius="50%"
            height="3.5rem"
            width="3.5rem"
            iconSize="1.25rem"
            boxshadow
            bgColor={audioEnabled ? THEME_BG_PRIMARY : THEME_COLOR_PRIMARY}
            Icon={audioEnabled ? FaMicrophone : FaMicrophoneSlash}
            onClick={handleToggleAudio}
          />
          <IconButton
            borderRadius="50%"
            height="3.5rem"
            width="3.5rem"
            iconSize="1.25rem"
            boxshadow
            bgColor={videoEnabled ? THEME_BG_PRIMARY : THEME_COLOR_PRIMARY}
            Icon={videoEnabled ? FaVideo : FaVideoSlash}
            onClick={handleToggleVideo}
          />
          {!roomId && (
            <IconButton
              borderRadius="50%"
              height="3.5rem"
              width="3.5rem"
              iconSize="1.25rem"
              boxshadow
              Icon={FaEllipsisV}
              bgColor={THEME_BG_PRIMARY}
              onClick={toggleShowRoomInfo}
            />
          )}
          <IconButton
            borderRadius="50%"
            height="3.5rem"
            width="3.5rem"
            iconSize="1.25rem"
            boxshadow
            Icon={FaPhoneSlash}
            onClick={handleDisconnectCall}
          />
        </ButtonContainer>
      </VideoContainer>
    </Container>
  );
};

export default Room;
