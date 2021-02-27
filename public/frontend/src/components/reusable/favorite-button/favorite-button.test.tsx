import "@testing-library/jest-dom";
import React from "react";
import FavoriteButton from "#components/reusable/favorite-button/favorite-button";
import userEvent from "@testing-library/user-event";
import {Store} from "@reduxjs/toolkit";
import {HandlerTypeEnum, MethodEnum, Token} from "#server/src/model/token";
import {configureAppStore, renderWithRedux} from "#src/test-utils";
import {RootState} from "#src/js/redux/reducers/root-reducer";

describe(`FavoriteButton`, () => {
  const token = new Token({
    link: `http://google.com`,
    method: MethodEnum.GET,
    handlerType: HandlerTypeEnum.SERVER,
    shortLink: false
  });
  const tokenString = token.toEncryptedString();
  const uuid = `mock-uuid`;
  const nonEmptyState = {
    favoriteReducer: {
      favorite: {
        [tokenString]: {
          link: `temp`,
          name: `temp`,
          domain: `temp`,
          labels: []
        }
      }
    }
  } as RootState;
  let store: Store;

  describe(`Dispatching events correctly`, () => {
    test(`Add`, () => {
      store = configureAppStore();
      const mockDispatch = jest.fn();
      store.dispatch = mockDispatch;

      const {getByRole} = renderWithRedux(<FavoriteButton tokenString={tokenString} uuid={uuid}/>, {store});

      userEvent.click(getByRole(`button`));
      expect(mockDispatch.mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls[0][0].type).toBe(`favorite/addToFavorite`);
      expect(mockDispatch.mock.calls[0][0].payload.tokenString).toBe(tokenString);
      expect(mockDispatch.mock.calls[0][0].payload.uuid).toBe(uuid);
    });

    test(`Remove`, () => {
      store = configureAppStore(nonEmptyState);
      const mockDispatch = jest.fn();
      store.dispatch = mockDispatch;

      const {getByRole} = renderWithRedux(<FavoriteButton tokenString={tokenString} uuid={uuid}/>, {store});

      userEvent.click(getByRole(`button`));
      expect(mockDispatch.mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls[0][0].type).toBe(`favorite/removeFromFavorite`);
      expect(mockDispatch.mock.calls[0][0].payload.tokenString).toBe(tokenString);
      expect(mockDispatch.mock.calls[0][0].payload.uuid).toBe(uuid);

    });
  });

  describe(`Icons displays correctly`, () => {
    test(`On empty state`, () => {
      store = configureAppStore();

      const {getAllByRole} = renderWithRedux(<FavoriteButton tokenString={tokenString} uuid={uuid}/>, {store});
      const [img1, img2] = getAllByRole(`img`);

      expect(img1).toHaveAttribute(`src`, `star-filled.svg`);
      expect(img1).toHaveClass(`uk-hidden`);

      expect(img2).toHaveAttribute(`src`, `star-empty.svg`);
      expect(img2).not.toHaveClass(`uk-hidden`);
    });

    test(`On real state`, () => {
      store = configureAppStore(nonEmptyState);

      const {getAllByRole} = renderWithRedux(<FavoriteButton tokenString={tokenString} uuid={uuid}/>, {store});
      const [img1, img2] = getAllByRole(`img`);

      expect(img1).toHaveAttribute(`src`, `star-filled.svg`);
      expect(img1).not.toHaveClass(`uk-hidden`);

      expect(img2).toHaveAttribute(`src`, `star-empty.svg`);
      expect(img2).toHaveClass(`uk-hidden`);
    });
  });
});
