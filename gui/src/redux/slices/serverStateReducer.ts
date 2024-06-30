import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ContextProviderDescription,
  ContinueConfig,
  SlashCommandDescription,
} from "core";

const TEST_SLASH_COMMANDS = [
  {
    name: "edit",
    description: t('edit-the-code'),
  },
  {
    name: "cmd",
    description: t('generate-a-command'),
  },
  {
    name: "help",
    description: t('get-help-using-continue'),
  },
];

type ServerState = {
  meilisearchUrl: string | undefined;
  slashCommands: SlashCommandDescription[];
  selectedContextItems: any[];
  config: ContinueConfig;
  contextProviders: ContextProviderDescription[];
  savedContextGroups: any[]; // TODO: Context groups
  indexingProgress: number;
};

const initialState: ServerState = {
  meilisearchUrl: undefined,
  slashCommands: [],
  selectedContextItems: [],
  config: {
    models: [],
  } as any,
  contextProviders: [],
  savedContextGroups: [],
  indexingProgress: 1.0,
};

export const serverStateSlice = createSlice({
  name: "serverState",
  initialState,
  reducers: {
    setSlashCommands: (
      state,
      action: PayloadAction<ServerState["slashCommands"]>,
    ) => {
      state.slashCommands = [
        ...action.payload,
        { name: "codebase", description: t('retrieve-codebase-context') },
        { name: "so", description: t('search-stackoverflow') },
      ];
    },
    setContextProviders: (
      state,
      action: PayloadAction<ServerState["contextProviders"]>,
    ) => {
      state.contextProviders = action.payload;
    },
    setIndexingProgress: (
      state,
      action: PayloadAction<ServerState["indexingProgress"]>,
    ) => {
      state.indexingProgress = action.payload;
    },
  },
});

export const { setContextProviders, setSlashCommands, setIndexingProgress } =
  serverStateSlice.actions;
export default serverStateSlice.reducer;
