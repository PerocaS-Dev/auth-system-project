import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-full bg-brand-lighter_orange flex justify-center items-center py-3">
      <div className="w-2/3 h-full border-2 border-brand-gray_green bg-brand-lighter_orange rounded-md my-10 flex items-center flex-col py-5 ">
        <h1 className="text-3xl text-brand-gray_green mb-5 font-bold ">
          Admin Dashboard
        </h1>
        <div className="w-full h-auto px-5">
          <table className="table-auto border-2 border-brand-gray_green w-full">
            <thead>
              <tr className="h-10">
                <th className="border-r-2 border-brand-gray_green px-5">
                  Firstname
                </th>
                <th className="border-r-2 border-brand-gray_green px-5">
                  Lastname
                </th>
                <th className="border-r-2 border-brand-gray_green px-5">
                  Username
                </th>
                <th className="border-r-2 border-brand-gray_green px-5">
                  Email
                </th>
                <th className="border-r-2 border-brand-gray_green px-5">
                  Contact
                </th>
                <th className="border-r-2 border-brand-gray_green px-5">
                  Role
                </th>
                <th className="border-r-2 border-brand-gray_green px-5">
                  Delete User
                </th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
