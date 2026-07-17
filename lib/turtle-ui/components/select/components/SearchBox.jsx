import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce, useEffectAfterMount } from "../../../hooks";
import { IconSearch } from "../../../assets/icons/InterfaceIcons";

export const SearchBox = ({ onSearchChange = () => {}, ref }) => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffectAfterMount(() => {
    onSearchChange?.(searchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="tui-select-search-container">
      <div className="tui-select-search-input-container">
        <div className="tui-select-search-icon-container">
          <IconSearch />
        </div>
        <input
          ref={ref}
          type="search"
          name="search"
          id="search"
          className="tui-select-search-input"
          placeholder={t("placeholder.search")}
          value={searchTerm}
          onChange={({ target: { value } }) => setSearchTerm(value)}
        />
      </div>
    </div>
  );
};
