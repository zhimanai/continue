import { $t } from "../../config/i18n.js";
import { SlashCommand } from "../../index.js";
import EditSlashCommand from "./edit.js";

const CommentSlashCommand: SlashCommand = {
  name: "comment",
  description: $t('write-comments-for-highlighted-code'),
  run: async function* (sdk) {
    for await (const update of EditSlashCommand.run({
      ...sdk,
      input:
        $t('write-comments-for-this-code-do-not-change-anything-about-the-code-itself'),
    })) {
      yield update;
    }
  },
};

export default CommentSlashCommand;
