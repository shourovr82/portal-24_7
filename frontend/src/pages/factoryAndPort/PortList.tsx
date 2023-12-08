/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Table } from "rsuite";
import { useGetAllPortsQuery } from "../../redux/features/ports/portsApi";
import { cellCss, headerCss } from "../../components/styles/CommonCss";
import { getUserInfo } from "../../hooks/services/auth.service";
import { IUserDetails } from "../users/addUser.interface";
import { useState } from "react";
const { Column, HeaderCell, Cell } = Table;
import PortEditModal from "../../components/port/PortEditModal";
import { MdModeEdit } from "react-icons/md";

const PortList = () => {
  const { data: ports, isLoading } = useGetAllPortsQuery(null);
  const { role } = getUserInfo() as IUserDetails;

  const [portEditOpen, setPortEditOpen] = useState<boolean>(false);
  const [portEditData, setPortEditData] = useState<any>(null);

  const handlePortEditModalOpen = (data: any) => {
    setPortEditOpen(true);
    setPortEditData(data);
  };
  const handlePortEditModalClose = () => {
    setPortEditOpen(false);
    setPortEditData(null);
  };

  return (
    <>
      <div className="px-3 mt-2">
        <Table
          loading={isLoading}
          height={500}
          data={ports?.data}
          bordered
          rowHeight={60}
          cellBordered
        >
          <Column flexGrow={2}>
            <HeaderCell style={headerCss}>Port Name</HeaderCell>
            <Cell dataKey="portName" />
          </Column>

          <Column flexGrow={2}>
            <HeaderCell style={headerCss}>Port Address</HeaderCell>
            <Cell dataKey="portAddress" />
          </Column>

          {role !== "USER" && (
            <Column width={70}>
              <HeaderCell style={headerCss}>Action</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" align="center">
                {(rowData: any) => (
                  <IconButton
                    onClick={() => handlePortEditModalOpen(rowData)}
                    circle
                    icon={<MdModeEdit size={20} />}
                  />
                )}
              </Cell>
            </Column>
          )}
        </Table>
      </div>
      {/* edit modal */}
      <PortEditModal
        open={portEditOpen}
        portEditData={portEditData}
        handleClose={handlePortEditModalClose}
      />
    </>
  );
};

export default PortList;
