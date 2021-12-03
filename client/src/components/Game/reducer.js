import {BUTTON_COLORS} from '../../const'

export const BUTTON_CLICK = 'BUTTON_CLICK'
export const CHECK_ANSWER = 'CHECK_ANSWER'
export const RESET = 'RESET'
export const SET_LEVEL = 'SET_LEVEL'
export const GAME_STATUS = 'GAME_STATUS'
export const ADD_GAME_PATTERN = 'ADD_GAME_PATTERN'
export const GAME_OVER = 'GAME_OVER'
export const RESET_USERCLICK_PATTERN = 'RESET_USERCLICK_PATTERN'

export const initialState = {
    buttonColors : BUTTON_COLORS,
    gamePattern : [],
    userClickedPattern : [],
    level : 0,
    isGameStarted : false,
    isGameOver : false
}

export const reducer = (state, action) => {
    const {type,payload} = action
    switch (type) {
      case ADD_GAME_PATTERN: {
          return {
              ...state,
              gamePattern : [...state.gamePattern, payload]
          }
      }
      case BUTTON_CLICK:
        return {
            ...state,
            userClickedPattern : [...state.userClickedPattern,payload]
        }
      case SET_LEVEL: {
          return {
              ...state,
              level : action.payload
          }
      }
      case GAME_STATUS: {
          return {
              ...state,
              isGameStarted : payload
          }
      }
      case GAME_OVER: {
          return {
              ...state,
              isGameOver : payload,
              buttonColors : BUTTON_COLORS,
              gamePattern : [],
              userClickedPattern : [],
              level : 0,
              isGameStarted : false
          }
      }
      case RESET_USERCLICK_PATTERN:{
          return {
              ...state,
              userClickedPattern : [],
          }
      }
      default:
        return state;
    }
}
  