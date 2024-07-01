//os.platform()
//os.arch()

import os from "os";
import {
  ContextItem,
  ContextProviderDescription,
  ContextProviderExtras,
} from "../../index.js";
import { BaseContextProvider } from "../index.js";
import { $t } from "../../config/i18n.js";

class OSContextProvider extends BaseContextProvider {
  static description: ContextProviderDescription = {
    title: "OS",
    displayTitle: "OS",
    description: $t('os-and-cpu-information'),
    type: "normal",
  };

  async getContextItems(
    query: string,
    extras: ContextProviderExtras,
  ): Promise<ContextItem[]> {
    const cpu = os.arch();
    const platform = os.platform();
    return [
      {
        description: $t('your-os-and-cpu'),
        content: $t('i-am-running-platform-on-cpu', {platform, cpu}),
        name: "OS",
      },
    ];
  }
}

export default OSContextProvider;
