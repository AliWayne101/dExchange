import React, { useState } from "react";
import { apple, bill, google } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import { backendAddr } from "../constants";

const Billing = () => {
  const [targetEmail, setTargetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTableData, setShowTableData] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const queryEmail = (e) => {
    setTargetEmail(e.target.value);
  };

  const Track = () => {
    setIsLoading(true);
    axios
      .get(`${backendAddr}/search?email=${targetEmail}`)
      .then((response) => {
        setIsLoading(false);
        setTableData(response.data.data);
        setShowTableData(true);
      })
      .catch((err) => {
        console.log("Unable");
      });
  };

  return (
    <section id="track" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <img
          src={bill}
          alt="billing"
          className="w-[100%] h-[100%] relative z-[5]"
        />

        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full pink__gradient" />
      </div>
      <div className={layout.sectionInfo}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {showTableData ? (
              <>
                <table
                  className={`${styles.paragraph} table-fixed w-full border-2 border-sky-200 border-x-sky-500`}
                >
                  <thead>
                    <tr>
                      <th>Amount (PKR)</th>
                      <th>Status</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {tableData.slice(0, 5).map((target, index) => (
                      <tr key={index}>
                        <td className="text-secondary text-[16px]">
                          {target.PKR.toLocaleString()} PKR
                        </td>
                        <td className="flex w-full text-center justify-center">
                          <div
                            className={`h-[15px] w-[15px] rounded rounded-[100%] ${
                              target.Status === "Pending"
                                ? "bg-red-500"
                                : "bg-green-500"
                            } items-center mt-2 ml-4`}
                          ></div>
                          <span className="block ml-2">{target.Status}</span>
                        </td>
                        <td className="text-[12px]">{target.tStamp}</td>
                      </tr>
                    ))}
                    {showAll
                      ? tableData.length > 5
                        ? tableData.slice(0, 4).map((target, index) => (
                            <tr key={index}>
                              <td className="text-secondary text-[16px]">
                                {target.PKR.toLocaleString()} PKR
                              </td>
                              <td className="flex w-full text-center justify-center">
                                <div
                                  className={`h-[15px] w-[15px] rounded rounded-[100%] ${
                                    target.Status === "Pending"
                                      ? "bg-red-500"
                                      : "bg-green-500"
                                  } items-center mt-2 ml-4`}
                                ></div>
                                <span className="block ml-2">
                                  {target.Status}
                                </span>
                              </td>
                              <td className="text-[12px]">{target.tStamp}</td>
                            </tr>
                          ))
                        : ""
                      : ""}
                  </tbody>
                </table>
                <span className="mt-2" onClick={() => setShowAll(true)}>
                  {showAll === false ? <Button text="Show All" /> : ""}
                </span>
              </>
            ) : (
              <>
                <h2 className={styles.heading2}>
                  Easily control and <br className="sm:block hidden" /> track
                  your transactions
                </h2>
                <p className={`${styles.paragraph} max-w-[470px mt-5]`}>
                  We store each transaction in our database, so you could keep
                  track of all the transactions you've made over time with our
                  website.
                </p>
                <div
                  className={`h-[60px] w-[100%] grid grid-cols-2 gap-2 content-center mt-4 ${styles.paragraph}`}
                >
                  <input
                    type="email"
                    className={styles.inputField}
                    onChange={queryEmail}
                    placeholder="something@something.com"
                    autoComplete="on"
                  />
                  <span className="w-full" onClick={Track}>
                    <Button text="Track" />
                  </span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Billing;
