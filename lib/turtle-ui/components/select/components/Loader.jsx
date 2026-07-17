import { DataList } from "../../list/DataList";

export const Loader = () => (
  <DataList
    className="tui-select-loader "
    data={Array.from({ length: 5 })}
    render={() => <div className="tui-select-loader-item"></div>}
  />
);
