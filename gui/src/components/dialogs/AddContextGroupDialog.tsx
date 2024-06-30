import { ContextItemWithId } from "core";
import { useDispatch } from "react-redux";
import { Button, Input } from "..";
import {
  setDialogMessage,
  setShowDialog,
} from "../../redux/slices/uiStateSlice";

function AddContextGroupDialog({
  selectedContextItems,
}: {
  selectedContextItems: ContextItemWithId[];
}) {
  const dispatch = useDispatch();

  let inputElement: HTMLInputElement | null = null;

  const handleCreate = () => {
    dispatch(setDialogMessage(undefined));
    dispatch(setShowDialog(false));
    const title = inputElement ? inputElement.value : t('my-context-group');
    // TODO
  };

  return (
    <div className="p-4">
      <Input
        defaultValue={t('my-context-group-0')}
        type="text"
        ref={(input) => {
          inputElement = input;
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreate();
          }
        }}
      />
      <br />
      <Button className="ml-auto" onClick={handleCreate}>
        {t('create')}
      </Button>
    </div>
  );
}

export default AddContextGroupDialog;
