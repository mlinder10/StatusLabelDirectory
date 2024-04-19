import { Dispatch, SetStateAction } from "react";

type LinkInputProps = {
  link: string;
  setLink: Dispatch<SetStateAction<string>>
};

export default function LinkInput({ link, setLink }: LinkInputProps) {
  function handleClick() {
    window.open(link, "_blank");
  }

  return (
    <div>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Link"
        className=""
      />
      <button onClick={handleClick}>Go</button>
    </div>
  );
}
