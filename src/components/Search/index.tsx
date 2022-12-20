import { FormEvent, useState } from "react";
import "./style.css";

type SearchProps = {
  onEnter: (search: string) => void;
};

const Search = ({ onEnter }: SearchProps) => {
  const [search, setSearch] = useState<string>("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEnter(search);
  };

  return (
    <form className="flex" onSubmit={onSubmit}>
      <input
        className="search"
        type="search"
        value={search}
        data-testid="search-input"
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Search;
