import { SlashCommand } from "../../index.js";
import EditSlashCommand from "./edit.js";

const CommentSlashCommand: SlashCommand = {
  name: "comment",
  description: "生成注释",
  run: async function* (sdk) {
    for await (const update of EditSlashCommand.run({
      ...sdk,
      input:
        "Write comments for this code. Do not change anything about the code itself.",
    })) {
      yield update;
    }
  },
};

export default CommentSlashCommand;
