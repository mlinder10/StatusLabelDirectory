import { Dispatch, SetStateAction } from "react";
import styles from "../styles/label.module.css";

type LinkInputProps = {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
};

export default function LinkInput({ link, setLink }: LinkInputProps) {
  function handleClick() {
    window.open(link, "_blank");
  }

  return (
    <div className={styles["link-container"]}>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Link"
      />
      <button onClick={handleClick}>Go</button>
    </div>
  );
}
