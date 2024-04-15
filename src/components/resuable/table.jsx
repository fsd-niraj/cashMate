import Spinner from "./loaders/spinner";

const Table = ({ columns, data, isLoading, onRowClick }) => {

  function useTable(columns, data = []) {
    const rows = data?.map((row) => {
      const cells = columns?.map((cell) => {
        const key = cell.id;
        let value;
        if (typeof cell.accessor === 'string') {
          value = row[cell.accessor];
        } else if (typeof cell.accessor === 'function') {
          value = cell.accessor(row);
        }
        const render = cell.render || ((value) => <>{value}</>);
        const color = cell.color && cell.color;
        return { key, value, render, color };
      });
      return { key: row.id, cells };
    });
    return rows;
  }

  const rows = useTable(columns, data);

  const handleRowClick = (rowData) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  return (
    <>
      {isLoading ? (<Spinner />) :
        data?.length > 0 ?
          <table className="table table-hover cursor-pointer">
            <thead style={{ position: "sticky", top: 0 }}>
              <tr>
                {columns?.map((col) => (
                  <th key={col.id}
                  //  style={{ width: `${col.width || 0}%` }}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows?.map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(data[index])}>
                  {row?.cells?.map((cell) => (
                    <td key={cell.key} style={{ color: cell.color }}>{cell.render(cell.value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          :
          <div className="h6 text-center w-100">
            <p className="mt-4 h5">No Data to show</p>
          </div>
      }
    </>
  );
}

export default Table;