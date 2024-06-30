import { useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { Input, Label, Select, defaultBorderRadius, lightGray } from "..";
import { getFontSize } from "../../util";

const Div = styled.div<{ dashed: boolean }>`
  border: 1px ${(props) => (props.dashed ? "dashed" : "solid")} ${lightGray};
  border-radius: ${defaultBorderRadius};
  padding: 8px;
  margin-bottom: 16px;
`;

type ModelOption = "apiKey" | "model" | "contextLength";

const DefaultModelOptions: {
  [key: string]: { [key in ModelOption]?: string };
} = {
  OpenAI: {
    apiKey: "",
    model: "gpt-4",
  },
  OpenAIFreeTrial: {
    apiKey: "",
    model: "gpt-4",
  },
  Anthropic: {
    apiKey: "",
    model: "claude-2",
  },
  default: {
    apiKey: "",
    model: "gpt-4",
  },
};

function ModelSettings(props: { llm: any | undefined; role: string }) {
  const [modelOptions, setModelOptions] = useState<{
    [key in ModelOption]?: string;
  }>(DefaultModelOptions[props.llm?.class_name || "default"]);

  const { register, setValue, getValues } = useFormContext();

  return (
    <Div dashed={typeof props.llm === undefined}>
      {props.llm ? (
        <>
          <b>{props.role}</b>: <b> {props.llm?.class_name || "gpt-4"}</b>
          <form>
            {typeof modelOptions.apiKey !== undefined && (
              <>
                <Label fontSize={getFontSize()}>API Key</Label>
                <Input
                  type="text"
                  defaultValue={props.llm.apiKey}
                  placeholder={t('api-key')}
                  {...register(`models.${props.role}.apiKey`)}
                />
              </>
            )}
            {modelOptions.model && (
              <>
                <Label fontSize={getFontSize()}>Model</Label>
                <Input
                  type="text"
                  defaultValue={props.llm.model}
                  placeholder={t('model')}
                  {...register(`models.${props.role}.model`)}
                />
              </>
            )}
          </form>
        </>
      ) : (
        <div>
          <b>{t('add-model')}</b>
          <div className="my-4">
            <Select
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  e.target.value = "";
                }
              }}
            >
              <option disabled value="">
                {t('select-model-type')}
              </option>
              <option value="newModel1">{t('new-model')} 1</option>
              <option value="newModel2">{t('new-model')} 2</option>
              <option value="newModel3">{t('new-model')} 3</option>
            </Select>
          </div>
        </div>
      )}
    </Div>
  );
}

export default ModelSettings;
