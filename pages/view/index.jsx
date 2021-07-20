import Nav from "../../components/nav";
import { useState, useEffect } from "react";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import format from "date-fns/format";

export default function View() {
  const [page, setPage] = useState(0);
  const [results, setResults] = useState(5);
  const [fedsData, setFedsData] = useState({});
  const [alert, setAlert] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let feds = [];
      try {
        const res = await fetch(`/api/feed?page=0&results=5`);
        const data = await res.json();
        // console.log("data", data);

        if (data) {
          feds = data.data;
          setFedsData(feds);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const handleLoadMoreInfo = async () => {
    try {
      const nextPage = page + 1;
      const feds = await fetch(`/api/feed?page=${nextPage}&results=${results}`);
      const res = await feds.json();
      if (res && res.success) {
        if (res.data && res.data.length > 0) {
          setPage(nextPage);
          setFedsData([...fedsData, ...res.data]);
        }
      } else {
        setAlert({
          severity: "error",
          message: "Failed to loading data. Please try again later.",
        });
      }
    } catch (e) {
      setAlert({ severity: "error", message: "Some thing went wrong." });
      console.error(e);
    }
  };

  return (
    <>
      <Nav alert={alert} />
      {fedsData && Object.keys(fedsData).length !== 0 ? (
        <main>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Log Date (MM/DD/YYYY)</TableCell>
                <TableCell>Fed Date (MM/DD/YYYY)</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Number of Ducks</TableCell>
                <TableCell>Food Type</TableCell>
                <TableCell>Food Weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fedsData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>
                    {format(new Date(row.created_date), "MM/dd/yyyy h:mmaaa")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(row.datetime), "MM/dd/yyyy h:mmaaa")}
                  </TableCell>
                  <TableCell>
                    {row.location && row.location.hasOwnProperty("address")
                      ? row.location["address"]
                      : ""}
                  </TableCell>
                  <TableCell>{row.duck_number}</TableCell>
                  <TableCell>{row.food_type}</TableCell>
                  <TableCell>{row.food_weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            <Link color="primary" href="#" onClick={handleLoadMoreInfo}>
              See more information
            </Link>
          </div>
        </main>
      ) : (
        <div></div>
      )}
    </>
  );
}
