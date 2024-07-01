import { $t } from "../../config/i18n.js";
import {
  ContextItem,
  ContextProviderDescription,
  ContextProviderExtras,
} from "../../index.js";
import { getBasename } from "../../util/index.js";
import { BaseContextProvider } from "../index.js";

class CurrentFileContextProvider extends BaseContextProvider {
  static description: ContextProviderDescription = {
    title: "currentFile",
    displayTitle: "Current File",
    description: $t('reference-the-currently-open-file'),
    type: "normal",
  };

  async getContextItems(
    query: string,
    extras: ContextProviderExtras,
  ): Promise<ContextItem[]> {
    const ide = extras.ide;
    const currentFile = await ide.getCurrentFile();
    if (!currentFile) {
      return [];
    }
    const contents = await ide.readFile(currentFile);
    return [
      {
        description: currentFile,
        content: $t('this-is-the-currently-open-file-n-n-getbasename-currentfile-n-contents-n', {currentFile: getBasename( currentFile, ), contents}),
        name: getBasename(currentFile),
      },
    ];
  }
}

export default CurrentFileContextProvider;
