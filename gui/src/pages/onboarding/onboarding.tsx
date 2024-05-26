import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { greenButtonColor } from "../../components";
import { postToIde } from "../../util/ide";
import { setLocalStorage } from "../../util/localStorage";
import { Div, StyledButton } from "./components";

function Onboarding() {
  const navigate = useNavigate();

  const [hovered0, setHovered0] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  const [selected, setSelected] = useState(-1);

  return (
    <div className="p-2 max-w-96 mt-16 mx-auto">
      <h1 className="text-center">感谢使用知满</h1>
      <p className="text-center pb-2">
        选择大模型
      </p>
      <Div
        color={greenButtonColor}
        disabled={false}
        selected={selected === 1}
        hovered={hovered1}
        onClick={() => {
          setSelected(1);
        }}
        onMouseEnter={() => setHovered1(true)}
        onMouseLeave={() => setHovered1(false)}
      >
        <h3>🔒 本地大模型</h3>
        <p>
          选择本地部署的Ollama， LM Studio等部署你的大模型
        </p>
      </Div>
      {selected === 1 && (
        <p className="px-3">
          <b>Embeddings:</b> Local sentence-transformers model
          <br />
          <br />
          <b>Autocomplete:</b> Starcoder2 3b (set up with Ollama, LM Studio,
          etc.)
          <br />
          <br />
          <b>Chat:</b> Llama 3 with Ollama, LM Studio, etc.
        </p>
      )}
      <br></br>
      {/* <p>
        <a href="https://docs.continue.dev/customization/overview">
          Read the docs
        </a>{" "}
        to learn more and fully customize Continue by opening config.json.
      </p> */}
      <Div
        color={"#1b84be"}
        disabled={false}
        selected={selected === 2}
        hovered={hovered2}
        onMouseEnter={() => setHovered2(true)}
        onMouseLeave={() => setHovered2(false)}
        onClick={() => {
          setSelected(2);
          postToIde("openConfigJson", undefined);
        }}
      >
        <h3>⚙️ 私有云上的模型</h3>
        <p>
            在 config.json 文件里配置你的私有云大模型。你可能需要指定域名，端口，和API密钥。
        </p>
      </Div>
      {selected === 2 && (
        <p className="px-3">
          Use <code>config.json</code> to configure your own{" "}
          <a href="https://docs.continue.dev/model-setup/overview">models</a>,{" "}
          <a href="https://docs.continue.dev/customization/context-providers">
            context providers
          </a>
          ,{" "}
          <a href="https://docs.continue.dev/customization/slash-commands">
            slash commands
          </a>
          , and <a href="https://docs.continue.dev/reference/config">more</a>.
        </p>
      )}

      <br />
      <div className="flex">
        <StyledButton
          blurColor={
            selected === 0
              ? "#be841b"
              : selected === 1
              ? greenButtonColor
              : "#1b84be"
          }
          disabled={selected < 0}
          onClick={() => {
            postToIde("completeOnboarding", {
              mode: ["optimized", "local", "custom"][selected] as any,
            });
            setLocalStorage("onboardingComplete", true);

            if (selected === 1) {
              navigate("/localOnboarding");
            } else {
              // Only needed when we switch from the default (local) embeddings provider
              postToIde("index/forceReIndex", undefined);
              // Don't show the tutorial above yet because there's another step to complete at /localOnboarding
              postToIde("showTutorial", undefined);
              navigate("/");
            }
          }}
        >
          Continue
        </StyledButton>
      </div>
    </div>
  );
}

export default Onboarding;
