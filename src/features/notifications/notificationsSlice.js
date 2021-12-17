import {
  createSlice,
  createEntityAdapter,
  createSelector,
  createAction,
  isAnyOf,
} from "@reduxjs/toolkit";

import { forceGenerateNotifications } from "../../api/server";
import { apiSlice } from "../api/apiSlice";
import { WebSocket } from "mock-socket";

const notificationsReceived = createAction(
  "notifications/notificationsReceived"
);

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/notifications",
      onCacheEntryAdded: async (
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) => {
        const ws = new WebSocket("ws://localhost");
        try {
          await cacheDataLoaded;
          const listener = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
              case "notfications": {
                updateCachedData((draft) => {
                  draft.push(...message.payload);
                  draft.sort((a, b) => b.date.localeCompare(a.date));
                });
                dispatch(notificationsReceived(message.payload));
                break;
              }
              default:
                break;
            }
          };
          ws.addEventListener("message", listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useGetNotificationsQuery } = extendedApi;

const emptyNotifications = [];

export const selectNotificationsResult =
  extendedApi.endpoints.getNotifications.select();

const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationsResult) => notificationsResult.data ?? emptyNotifications
);

export const fetchNotificationsWebsocket = () => (dispatch, getState) => {
  const allNotifications = selectNotificationsData(getState());
  const [latestNotification] = allNotifications;
  const latestTimestamp = latestNotification?.date ?? "";
  // Hardcode a call to the mock server to simulate a server push scenario over websockets
  forceGenerateNotifications(latestTimestamp);
};

const notificationsAdapter = createEntityAdapter();

const matchNotificationsReceived = isAnyOf(
  notificationsReceived,
  extendedApi.endpoints.getNotifications.matchFulfilled
);

const initialState = notificationsAdapter.getInitialState();

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    allNotificationsRead: (state, action) => {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(matchNotificationsReceived, (state, action) => {
      const notificationsMetadata = action.payload.map((notification) => ({
        id: notification.id,
        read: false,
        isNew: true,
      }));
      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read;
      });
      notificationsAdapter.upsertMany(state, notificationsMetadata);
    });
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;
export const {
  selectAll: selectNotificationsMetadata,
  selectEntities: selectMetadataEntities,
} = notificationsAdapter.getSelectors((state) => state.notifications);

export default notificationsSlice.reducer;
