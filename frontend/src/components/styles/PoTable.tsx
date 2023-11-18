/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "rsuite";

const { Column, HeaderCell, Cell } = Table;
import { Button } from "rsuite";
import { Link } from "react-router-dom";

// const data = [
//   {
//     id: 1,
//     styleNo: "849AC",
//     cityRowSpan: 3,
//     orderNo: 10321368,
//     noOfPack: 2,
//     totalPack: 5501,
//     totalPc: 11002,
//     order: "ZD415",
//     orderId: "55589",
//     aliexpressID: "2.5kg",
//     variants: "Body Suits",
//     country: "$55.47",
//     aliexpressTotalPrice: "650",
//     orderStatus: "Unpaid",
//     action: 1,
//     img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
//   },
//   {
//     id: 2,
//     styleNo: "849AC",
//     orderNo: 10355144,
//     noOfPack: 2,
//     totalPack: 8002,
//     totalPc: 16004,
//     order: "ZD415",
//     orderId: "55589",
//     aliexpressID: "2.5kg",
//     variants: "Body Suits",
//     country: "$55.47",
//     aliexpressTotalPrice: "650",
//     orderStatus: "Unpaid",
//     action: 5,
//     img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
//   },
//   {
//     id: 3,
//     styleNo: "849AC",
//     noOfPack: 2,
//     orderNo: 10321612,
//     totalPack: 4500,
//     totalPc: 9000,
//     order: "ZD415",
//     orderId: "55589",
//     aliexpressID: "2.5kg",
//     variants: "Body Suits",
//     country: "$55.47",
//     aliexpressTotalPrice: "650",
//     orderStatus: "Unpaid",
//     action: 3,
//     img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
//   },
// ];

const ButtonCell = ({ rowData, ...props }: any) => {
  return (
    <Cell {...props}>
      <Link to={`/po/poLists/${rowData.orderNo}`}>
        <Button appearance="primary" size="xs">
          Details
        </Button>
      </Link>
    </Cell>
  );
};

const PoTable = ({ orders }: any) => {
  return (
    <>
      <Table
        // rowHeight={(rowData) => rowData?.action * 38}
        rowHeight={55}
        headerHeight={48}
        autoHeight={true}
        data={orders}
        bordered={true}
        cellBordered={true}
        id="table"
      >
        {/* Style No*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Style NO
          </HeaderCell>
          <Cell
            dataKey="styleNo"
            verticalAlign="middle"
            style={{ fontSize: 14, fontWeight: 500, padding: 10 }}
          ></Cell>
        </Column>
        {/* PO NO */}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            PO NO
          </HeaderCell>
          <Cell
            dataKey="orderNo"
            verticalAlign="middle"
            style={{ fontSize: 14, fontWeight: 500, padding: 10 }}
          >
            {/* {(rowData) => `${rowData.order}`} */}
          </Cell>
        </Column>
        {/* No of Pack*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            No of Pack
          </HeaderCell>
          <Cell
            dataKey="noOfPack"
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {/* {(rowData) => `${rowData.variants}`} */}
          </Cell>
        </Column>
        {/* Pack*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Total Pack
          </HeaderCell>
          <Cell
            dataKey="totalPack"
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {/* {(rowData) => `${rowData.aliexpressID}`} */}
          </Cell>
        </Column>

        {/* PC*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Total PC
          </HeaderCell>
          <Cell
            dataKey="totalPc"
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {/* {(rowData) => `${rowData.aliexpressTotalPrice}`} */}
          </Cell>
        </Column>

        {/* Buyer ETD*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Buyer ETD
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            test
          </Cell>
        </Column>
        {/*  ETD*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Factory ETD
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            test
          </Cell>
        </Column>
        {/*  Port*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Factory Name
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            test
          </Cell>
        </Column>
        {/*  Factory*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Port Name
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            test
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Details
          </HeaderCell>
          <ButtonCell dataKey="id" />
        </Column>
      </Table>
    </>
  );
};

export default PoTable;
