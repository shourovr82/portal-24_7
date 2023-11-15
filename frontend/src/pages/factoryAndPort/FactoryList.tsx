/* eslint-disable @typescript-eslint/no-explicit-any */

import { cellCss, headerCss } from "../../components/styles/CommonCss";
import { getUserInfo } from "../../hooks/services/auth.service";
import { useGetAllFactoriesQuery } from "../../redux/features/factories/factoryApi";
import { IconButton, Table } from "rsuite";
import { IUserDetails } from "../users/addUser.interface";
import { RiEdit2Line } from "react-icons/ri";
import { useState } from "react";
import FactoryEditModal from "../../components/factory/FactoryEditModal";
const { Column, HeaderCell, Cell } = Table;

const FactoryList = () => {
  const {
    data: factories,
    isLoading,
    isFetching,
  } = useGetAllFactoriesQuery(null);
  const { role } = getUserInfo() as IUserDetails;

  const [factoryEditOpen, setFactoryEditOpen] = useState<boolean>(false);
  const [factoryEditData, setFactoryEditData] = useState<any>(null);

  const handleFactoryEditModalOpen = (data: any) => {
    setFactoryEditOpen(true);
    setFactoryEditData(data);
  };
  const handleFactoryEditModalClose = () => {
    setFactoryEditOpen(false);
    setFactoryEditData(null);
  };

  return (
    <>
      <div className="px-3 mt-2">
        <Table
          loading={isLoading || isFetching}
          height={500}
          data={factories?.data}
          bordered
          cellBordered
          rowHeight={60}
        >
          <Column flexGrow={2} verticalAlign="middle">
            <HeaderCell style={headerCss}>Factory Name</HeaderCell>
            <Cell align="left" dataKey="factoryName" />
          </Column>

          <Column flexGrow={2} verticalAlign="middle">
            <HeaderCell style={headerCss}>Factory Address</HeaderCell>
            <Cell dataKey="factoryAddress" />
          </Column>
          {role !== "USER" && (
            <Column width={70}>
              <HeaderCell style={headerCss}>Action</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" align="center">
                {(rowData: any) => (
                  <IconButton
                    onClick={() => handleFactoryEditModalOpen(rowData)}
                    circle
                    icon={<RiEdit2Line size={20} />}
                  />
                )}
              </Cell>
            </Column>
          )}
        </Table>
      </div>
      {/* factory Edit Modal */}
      <FactoryEditModal
        open={factoryEditOpen}
        factoryEditData={factoryEditData}
        handleClose={handleFactoryEditModalClose}
      />
    </>
  );
};

export default FactoryList;
