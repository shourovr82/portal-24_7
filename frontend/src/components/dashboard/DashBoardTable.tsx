import { Popover, Table, Whisper } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const data = [
  {
    id: 1,
    order: "ZD415",
    orderId: "55589",
    aliexpressID: "2.5kg",
    variants: "Body Suits",
    country: "$55.47",
    aliexpressTotalPrice: "650",
    orderStatus: "Unpaid",
    action: 1,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 2,
    order: "ZD415",
    orderId: "55589",
    aliexpressID: "2.5kg",
    variants: "Body Suits",
    country: "$55.47",
    aliexpressTotalPrice: "650",
    orderStatus: "Unpaid",
    action: 5,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 3,
    order: "ZD415",
    orderId: "55589",
    aliexpressID: "2.5kg",
    variants: "Body Suits",
    country: "$55.47",
    aliexpressTotalPrice: "650",
    orderStatus: "Unpaid",
    action: 3,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 4,
    order: "ZD415",
    orderId: "55589",
    aliexpressID: "2.5kg",
    variants: "Body Suits",
    country: "$55.47",
    aliexpressTotalPrice: "650",
    orderStatus: "Unpaid",
    action: 2,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 5,
    order: "ZD415",
    orderId: "55589",
    aliexpressID: "2.5kg",
    variants: "Body Suits",
    country: "$55.47",
    aliexpressTotalPrice: "650",
    orderStatus: "Unpaid",
    action: 7,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 6,
    order: "ZD415",
    orderId: "55589",
    aliexpressID: "2.5kg",
    variants: "Body Suits",
    country: "$55.47",
    aliexpressTotalPrice: "650",
    orderStatus: "Unpaid",
    action: 8,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 7,
    order: "ZD415",
    orderId: "55589",
    aliexpressID: "2.5kg",
    variants: "Body Suits",
    country: "$55.47",
    aliexpressTotalPrice: "650",
    orderStatus: "Unpaid",
    action: 9,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 8,
    order: "ZD415",
    orderId: "55589",
    aliexpressID: "2.5kg",
    variants: "Body Suits",
    country: "$55.47",
    aliexpressTotalPrice: "650",
    orderStatus: "Unpaid",
    action: 2,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 9,
    order: "ZD415",
    orderId: "55589",
    aliexpressID: "2.5kg",
    variants: "Body Suits",
    country: "$55.47",
    aliexpressTotalPrice: "650",
    orderStatus: "Unpaid",
    action: 1,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 10,
    order: "ZD415",
    orderId: "55589",
    aliexpressID: "2.5kg",
    variants: "Body Suits",
    country: "$55.47",
    aliexpressTotalPrice: "650",
    orderStatus: "Unpaid",
    action: 7,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
];

const ImageCell = ({ rowData, dataKey, ...props }: any) => {
  const speaker = (
    <Popover>
      <div>
        <img src={rowData.img} alt="" className="h-48 w-48 object-cover" />
      </div>
    </Popover>
  );
  return (
    <Cell {...props}>
      <Whisper placement="top" speaker={speaker}>
        <div>
          <img
            src={rowData.img}
            className="h-10 w-10 object-cover rounded-full"
          />
        </div>
      </Whisper>
    </Cell>
  );
};

const DashBoardTable = () => {
  return (
    <>
      <Table
        wordWrap="break-all"
        // rowHeight={(rowData) => rowData?.action * 38}
        rowHeight={55}
        headerHeight={48}
        autoHeight={true}
        data={data}
        bordered={true}
        cellBordered={true}
        id="table"
      >
        {/* image  */}
        <Column width={70}>
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
            Image
          </HeaderCell>
          <ImageCell dataKey="img" />
        </Column>
        {/* Style NO */}
        <Column width={80}>
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
            verticalAlign="middle"
            style={{ fontSize: 14, fontWeight: 500, padding: 10 }}
          >
            {(rowData) => `${rowData.order}`}
          </Cell>
        </Column>
        {/* PO*/}
        {/* <Column width={70}>
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
            PO No
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {(rowData) => `${rowData.orderId}`}
          </Cell>
        </Column> */}
        {/* category*/}
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
            Category
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {(rowData) => `${rowData.variants}`}
          </Cell>
        </Column>
        {/* Image description*/}
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
            Item Description
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {(rowData) => `${rowData.variants}`}
          </Cell>
        </Column>

        {/* PP/Strike off status*/}
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
            LD/CP/AOP Strike Off Status
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            <div>Lorem ipsum dolor sit amet, consectetur</div>
          </Cell>
        </Column>

        {/* PP/Strike off status*/}
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
            PP Strike Off Status
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            <div>Lorem ipsum dolor sit amet, consectetur</div>
          </Cell>
        </Column>
        {/* Bulk production Status*/}
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
            Bulk Production Status
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            <div>Lorem ipsum dolor sit amet, consectetur</div>
          </Cell>
        </Column>

        {/* User Name */}
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
            User Name
          </HeaderCell>
          <Cell
            // align="center"
            verticalAlign="middle"
            style={{ fontSize: 14, fontWeight: 500, padding: 10 }}
          >
            Mostafiz
          </Cell>
        </Column>

        {/* Time */}
        {/* <Column flexGrow={1}>
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
            Time
          </HeaderCell>
          <Cell>10 minuts ago</Cell>
        </Column> */}
      </Table>
    </>
  );
};

export default DashBoardTable;
