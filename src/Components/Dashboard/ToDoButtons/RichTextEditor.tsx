import { useRef } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const exec = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    onChange(editorRef.current?.innerHTML || "");
  };

  return (
    <div className="border rounded-4 overflow-hidden">
      {/* Toolbar */}
      <div className="d-flex flex-wrap gap-2 p-2 bg-light border-bottom">
        <select
          className="form-select form-select-sm w-auto"
          onChange={(e) => exec("fontName", e.target.value)}
        >
          <option>Arial</option>
          <option>Verdana</option>
          <option>Georgia</option>
          <option>Times New Roman</option>
        </select>

        <button className="btn btn-sm btn-light" onClick={() => exec("bold")}>
          <b>B</b>
        </button>
        <button className="btn btn-sm btn-light" onClick={() => exec("italic")}>
          <i>I</i>
        </button>
        <button className="btn btn-sm btn-light" onClick={() => exec("underline")}>
          <u>U</u>
        </button>

        <select
          className="form-select form-select-sm w-auto"
          onChange={(e) => exec("fontSize", e.target.value)}
        >
          <option value="3">14px</option>
          <option value="4">16px</option>
          <option value="5">18px</option>
        </select>

        <input
          type="color"
          className="form-control form-control-color form-control-sm"
          onChange={(e) => exec("foreColor", e.target.value)}
        />

        <button className="btn btn-sm btn-light" onClick={() => exec("justifyLeft")}>
          ⬅
        </button>
        <button className="btn btn-sm btn-light" onClick={() => exec("justifyCenter")}>
          ↔
        </button>
        <button className="btn btn-sm btn-light" onClick={() => exec("justifyRight")}>
          ➡
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="p-3"
        style={{
          minHeight: "220px",
          outline: "none",
        }}
        onInput={() =>
          onChange(editorRef.current?.innerHTML || "")
        }
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
};

export default RichTextEditor;
