import { $t } from "../../config/i18n.js";
import {
  ContextItem,
  ContextProviderDescription,
  ContextProviderExtras,
} from "../../index.js";
import { BaseContextProvider } from "../index.js";

class SearchContextProvider extends BaseContextProvider {
  static description: ContextProviderDescription = {
    title: "search",
    displayTitle: "Search",
    description: $t('use-ripgrep-to-exact-search-the-workspace'),
    type: "query",
  };

  async getContextItems(
    query: string,
    extras: ContextProviderExtras,
  ): Promise<ContextItem[]> {
    const results = await extras.ide.getSearchResults(query);
    return [
      {
        description: $t('search-results'),
        content: $t('results-of-searching-codebase-for-query-n-n-results', {query, results}),
        name: "Search results",
      },
    ];
  }
}

export default SearchContextProvider;
