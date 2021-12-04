import React, { useEffect, useReducer, useState } from "react";
import {
  initialState,
  reducer,
  BUTTON_CLICK,
  SET_LEVEL,
  GAME_STATUS,
  ADD_GAME_PATTERN,
  GAME_OVER,
  RESET_USERCLICK_PATTERN,
} from "./reducer";
import { pickRandomItem } from "../../helper";
import { Button, Container, ButtonsContainer } from "./style";

export default function Game({ handleGameOver }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    buttonColors,
    isGameStarted,
    level,
    userClickedPattern,
    gamePattern,
    isGameOver,
  } = state;
  let highscore = localStorage.getItem("highscore");

  const handleClick = (btnColor) => (e) => {
    if (isGameStarted) {
      let bodyEle = document.getElementById(btnColor);
      bodyEle.classList.add('pressed');
      setTimeout(() => {
        bodyEle.classList.remove('pressed');
      }, 200);
      playSound(btnColor);
      dispatch({
        type: BUTTON_CLICK,
        payload: btnColor,
      });
    }
  };

  // when game started
  useEffect(() => {
    if (isGameStarted) {
      nextLevel(level);
    }
  }, [isGameStarted]);

  const nextLevel = (level) => {
    if (level > highscore) {
      localStorage.setItem("highscore", level);
    }
    let randomColor = pickRandomItem(buttonColors);
    animate(randomColor);
    dispatch({
      type: ADD_GAME_PATTERN,
      payload: randomColor,
    });
    dispatch({
      type: SET_LEVEL,
      payload: level + 1,
    });
  };

  // start when user type any letter
  useEffect(() => {
    document.addEventListener("keydown", () => {
      if (!isGameStarted) {
        dispatch({
          type: GAME_STATUS,
          payload: true,
        });
      }
    });
  }, []);

  const playSound = (name) => {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  };

  useEffect(() => {
    if (userClickedPattern.length !== 0) {
      let clickedLevelIndex = userClickedPattern.length - 1;
      if (
        userClickedPattern[clickedLevelIndex] === gamePattern[clickedLevelIndex]
      ) {
        if (userClickedPattern.length === gamePattern.length) {
          dispatch({
            type: RESET_USERCLICK_PATTERN,
          });
          nextLevel(level);
        }
      } else {
        dispatch({
          type: GAME_OVER,
          payload: true,
        });
        playSound("wrong");
        handleGameOver(level);
      }
    }
  }, [userClickedPattern]);

  const animate = (colorId) => {
    let ele = document.getElementById(colorId);
    let prevBg = ele.style.backgroundColor;
    ele.style.backgroundColor = "#fff";
    setTimeout(() => {
      ele.style.backgroundColor = prevBg;
    }, 300);
  };

  return (
    <>
      {isGameStarted && <h1 style={{ color: "white" }}>Level {level}</h1>}
      {!isGameStarted && (
        <h1 style={{ color: "white" }}>Press Any Key to Start</h1>
      )}
      {!isGameStarted && isGameOver && (
        <h2 style={{ color: "red" }}>Game over</h2>
      )}
      <Container>
        <ButtonsContainer>
          {buttonColors.map((buttonColor) => (
            <Button
              id={buttonColor}
              onClick={handleClick(buttonColor)}
              bgColor={buttonColor}
              key={buttonColor}
            >
              {}
            </Button>
          ))}
        </ButtonsContainer>
      </Container>
      <h2 style={{ color: "white" }}>
        Highest Level : {highscore ? highscore : 0}
      </h2>
    </>
  );
}
