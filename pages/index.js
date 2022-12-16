import React, { useState, useEffect, Fragment } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Image,
  usePDF,
} from "@react-pdf/renderer";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

import { Button } from "antd";

export default function PDFComp({
  report_id,
  name,
  quiz_name,
  age,
  passing,
  questions,
  complete,
  passed,
  edu,
  learn,
  time_spent,
  starttime,
  score,
  percentage,
  status,
}) {
 

  const borderColor = "black";

  const [correct, setCorrect] = useState();

  useEffect(() => {
    const countans = Object.assign(
      {},
      ...Array.from(new Set(questions), (key) => ({
        [key.category]: questions.filter(
          (value) => value.category === key.category
        ).length,
      }))
    );

    const correctans = Object.assign(
      {},
      ...Array.from(new Set(questions), (key) => ({
        [key.category]: questions.filter(
          (value) => value.category === key.category && key.is_correct === true
        ).length,
      }))
    );
    let arr = [];

    for (let item of Object.entries(countans)) {
      for (let item2 of Object.entries(correctans)) {
        if (item[0] === item2[0]) {
          arr.push({ label: item[0], count: item[1], correct: item2[1] });
        }
      }
    }

    setCorrect(arr);
  }, [questions]);

  const TableRow = ({ items }) => {
    const rows = items.map((item) => (
      <View  key={Math.random()}>
        <Text>{item.desc}</Text>
        <Text >{item.xyz}</Text>
      </View>
    ));
    return <Fragment>{rows}</Fragment>;
  };

  const ItemsTable = ({ data }) => (
    <View>
      {/*<TableHeader />*/}
      <TableRow items={data} />
      {/*<TableFooter items={data.items} />*/}
    </View>
  );

  const MyDocument = () => (
    <Document>
      <Page>
        <View>
          <Text >{quiz_name}</Text>
          {/* <Text>Quiz Report</Text> */}
        </View>

        <View >
          <Text > Name: </Text>
          <Text >{name}</Text>
        </View>

        {/* Details Table */}
        <View >
          <View >
            <View >
              <Text >REPORT ID:</Text>
              <Text >{report_id}</Text>
              <Text >PASSING SCORE:</Text>
              <Text >{passing?.toFixed(2)}</Text>
            </View>
          </View>
          <View >
            <View >
              <Text >AGE:</Text>
              <Text >{age}</Text>
              <Text >ACTUAL SCORE:</Text>
              <Text >{score}</Text>
            </View>
          </View>
          <View>
            <View >
              <Text >EDUCATION:</Text>
              <Text >{edu}</Text>
              <Text >OVERALL STATUS:</Text>
              <Text
                style={
                  passed
                    ? {
                        width: "30%",
                        fontSize: 10,
                        textAlign: "left",

                        color: "white",
                        padding: 5,
                        backgroundColor: "#00FF00",
                      }
                    : {
                        width: "30%",
                        fontSize: 10,
                        textAlign: "left",
                        color: "white",
                        padding: 5,

                        backgroundColor: "#FF0000",
                      }
                }
              >
                {passed ? "PASSED" : "FAILED"}
              </Text>
            </View>
          </View>
          <View >
            <View >
              <Text >TEST DATE</Text>
              <Text></Text>
              <Text >COMPLETE</Text>
              <Text
                style={
                  complete
                    ? {
                        width: "30%",
                        fontSize: 10,
                        textAlign: "left",

                        color: "white",
                        padding: 5,
                        backgroundColor: "#00FF00",
                      }
                    : {
                        width: "30%",
                        fontSize: 10,
                        textAlign: "left",
                        color: "white",
                        padding: 5,
                        backgroundColor: "#FF0000",
                      }
                }
              >
                {complete ? "COMPLETED" : "INCOMPLETE"}
              </Text>
            </View>
          </View>
        </View>

        {/* Quiz Score */}

        <View >
          <Text >SCORES DETAIL</Text>
        </View>

        <View >
          <View >
            <Text >CATEGORY</Text>
            <Text >QUESTIONS</Text>
            <Text >CORRECT</Text>
            <Text>%</Text>
            <Text >STATUS</Text>
          </View>
          {correct?.map((i) => {
            return (
              <View >
                <View >
                  <Text
                    style={
                      Number(Number(i.correct / i.count) * 100).toFixed(2) >= 30
                        ? styles.ratetable
                        : styles.ratetableweak
                    }
                  >
                    {i.label}
                  </Text>
                  <Text
                    style={
                      Number(Number(i.correct / i.count) * 100).toFixed(2) >= 30
                        ? styles.ratetable
                        : styles.ratetableweak
                    }
                  >
                    {i.count}
                  </Text>
                  <Text
                    style={
                      Number(Number(i.correct / i.count) * 100).toFixed(2) >= 30
                        ? styles.ratetable
                        : styles.ratetableweak
                    }
                  >
                    {i.correct}
                  </Text>
                  <Text
                    style={
                      Number(Number(i.correct / i.count) * 100).toFixed(2) >= 30
                        ? styles.ratetable
                        : styles.ratetableweak
                    }
                  >
                    {Number(Number(i.correct / i.count) * 100).toFixed(2)}%
                  </Text>
                  <Text
                    style={
                      Number(Number(i.correct / i.count) * 100).toFixed(2) >= 30
                        ? styles.ratetablestrong
                        : styles.ratetableweak
                    }
                  >
                    {" "}
                    {Number(Number(i.correct / i.count) * 100).toFixed(2) >= 30
                      ? "STRONG"
                      : "WEAK"}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ marginTop: 20 }}>
          <Text >DOWNLOAD MATERIAL</Text>
          <Link href={learn}>
            CLICK HERE
          </Link>
        </View>

        {passed && (
          <>
            <View style={{ marginTop: 20 }}>
              <Text >NOTES</Text>
            </View>

            <View >
              <Text >
                CONGRATULATIONS! YOU HAVE PASSED THE ASSESSMENT TEST ; HOWEVER,
                YOU NEED TO PRACTICE MORE ON [PHISHING SCAMS] IN ORDER TO
                IMPROVE YOUR KNOWLEDGE. YOU CAN FIND AND DOWNLOAD THE STUDY
                MATERIAL ON YOUR ACCOUNT AT THE ISAT TOOL’S WEBSITE.
              </Text>
            </View>
          </>
        )}

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text style={{ flex: 1 }}>Training Manager</Text>
          <Text style={{ flex: 1 }}>STAMP</Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Image
            src={
              "https://d21b0h47110qhi.cloudfront.net/bo/image1-wrYiEeBy8F2Hm6o.png"
            }
            style={{ flex: 1, height: "140px" }}
          ></Image>

          <Image
            src={
              "https://d21b0h47110qhi.cloudfront.net/bo/image2-1hFxsxUC35JFBUB.jpeg"
            }
            style={{ flex: 1, height: "140px" }}
          ></Image>
        </View>
      </Page>
    </Document>
  );

  return (
    <div suppressHydrationWarning={true}>
      {process.browser && (
        <PDFDownloadLink document={<MyDocument />} fileName="myPdf">
          {({ loading }) =>
            loading ? (
              <button>loading..</button>
            ) : (
              <button>Download Report</button>
            )
          }
        </PDFDownloadLink>
      )}
    </div>
  );
}

// Create styles

// Create Document Component
