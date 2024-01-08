/* eslint-disable @typescript-eslint/no-explicit-any */
// mock.js

import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Popover,
  SelectPicker,
  Table,
  Whisper,
} from "rsuite";
const { Column, Cell, HeaderCell } = Table;
import SearchIcon from "@rsuite/icons/Search";
import { cellCss, headerCss } from "../../components/styles/CommonCss";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import ProblemEditModal from "../../components/users/ProblemEditModal";

const mockUsers = [
  {
    id: 1,

    city: "New York",
    email: "john.doe@example.com",
  },
  {
    id: 2,

    city: "San Francisco",
    email: "jane.smith@example.com",
  },
  {
    id: 3,

    city: "Los Angeles",
    email: "bob.johnson@example.com",
  },
  {
    id: 4,

    city: "Chicago",
    email: "alice.williams@example.com",
  },
  {
    id: 5,

    city: "Seattle",
    email: "charlie.brown@example.com",
  },
  { id: 6, city: "Miami", email: "eva.davis@example.com" },
  {
    id: 7,

    city: "Boston",
    email: "frank.wilson@example.com",
  },
  {
    id: 8,

    city: "Denver",
    email: "grace.miller@example.com",
  },
];

const ProblemReports = () => {
  const [open, setOpen] = useState(false);
  const [modalEditData, setModalEditData] = useState<any | null>(null);
  const handleProblemEditModal = (rowData: any) => {
    setModalEditData(rowData);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalEditData(null);
  };
  return (
    <>
      <div className="px-5 py-4  ">
        <div>
          <h2 className="text-[24px] font-semibold text-[#212B36]">
            Problems Reported By Users
          </h2>
          <div className="flex text-sm mt-3 gap-2 items-center">
            <Link to="/" className="text-blue-700 font-medium">
              Dashboard
            </Link>
            <IoIosArrowForward className="text-blue-700" />
            <span className="text-gray-500">Problems Reported</span>
          </div>
        </div>
        {/* tables */}

        <div className="border rounded-lg shadow-lg border-black mt-2 overflow-hidden">
          <div className="flex   gap-5 py-5 px-5">
            <div className="w-full">
              <InputGroup inside>
                <Input className="w-full" placeholder="Search by email..." />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
            </div>
            <div className="  w-full">
              <SelectPicker
                size="md"
                className="!w-full"
                placeholder="Filter by Problems..."
                data={[
                  "Eugenia",
                  "Bryan",
                  "Linda",
                  "Nancy",
                  "Lloyd",
                  "Alice",
                  "Julia",
                  "Albert",
                ].map((item) => ({ label: item, value: item }))}
                style={{ width: 224 }}
              />
            </div>
            <div className="  w-full">
              <SelectPicker
                size="md"
                searchable={false}
                className="!w-full"
                placeholder="Filter by Status..."
                data={[
                  { label: "Solved", value: "Solved" },
                  { label: "Working", value: "Working" },
                  { label: "Not Possible", value: "NotPossible" },
                  { label: "Hold", value: "Hold" },
                  { label: "Already Fixed", value: "Already Fixed" },
                ].map((item) => ({ label: item.label, value: item.value }))}
                style={{ width: 224 }}
              />
            </div>
          </div>
          {/* table */}
          <div>
            <Table
              wordWrap="break-word"
              shouldUpdateScroll={false}
              autoHeight
              data={mockUsers}
              bordered
              cellBordered
            >
              <Column width={45} align="center" verticalAlign="middle">
                <HeaderCell style={headerCss}>Serial</HeaderCell>
                <Cell style={cellCss} dataKey="id" />
              </Column>
              <Column width={210} align="start" verticalAlign="middle">
                <HeaderCell style={headerCss}>Email</HeaderCell>
                <Cell style={cellCss} dataKey="email" />
              </Column>

              <Column flexGrow={2} align="start" verticalAlign="middle">
                <HeaderCell style={headerCss}>Description</HeaderCell>
                <Cell style={cellCss} dataKey="city" />
              </Column>
              <Column width={200} align="start" verticalAlign="middle">
                <HeaderCell style={headerCss}>Category</HeaderCell>
                <Cell style={cellCss} dataKey="city" />
              </Column>
              {/*  */}
              <Column width={70}>
                <HeaderCell style={headerCss}>Action</HeaderCell>
                <Cell style={cellCss} verticalAlign="middle" align="center">
                  {(rowData: any) => (
                    <Whisper
                      placement="topEnd"
                      speaker={
                        <Popover
                          className="border bg-[#2baa56] text-white rounded-full py-1.5 px-5"
                          arrow={false}
                        >
                          Edit
                        </Popover>
                      }
                    >
                      <IconButton
                        // onClick={() => handleStyleEditModalOpen(rowData)}
                        onClick={() => handleProblemEditModal(rowData)}
                        circle
                        icon={<MdModeEdit size={20} />}
                      />
                    </Whisper>
                  )}
                </Cell>
              </Column>
            </Table>
          </div>
          {/* pagination */}

          <div style={{ padding: 20 }}>
            <Pagination
              total={20}
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="md"
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              limitOptions={[10, 20, 30, 50, 100, 150, 200]}
              // limit={size}
              // onChangeLimit={(limitChange) => setSize(limitChange)}
              // activePage={page}
              // onChangePage={setPage}
            />
          </div>
        </div>
      </div>
      {/* edit modal */}
      <ProblemEditModal
        open={open}
        handleClose={handleClose}
        modalEditData={modalEditData}
      />
    </>
  );
};

export default ProblemReports;
