import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiService } from "@/service/api.service";
import { UrlService } from "@/service/url.service";
import { tokenStore } from "@/states";
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Icon } from '@iconify/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function UserList(): React.ReactNode {

  const apiService = new ApiService()
  const urlService = new UrlService()
  const token = tokenStore(state => state.token)
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 5,
    total_page: 0
  })

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const handleCloseDialog = () => setDialogIsOpen(false)

  const [detailUser, setDetailUser] = useState<{
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    avatar: string
  }>({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  })

  const [userData, setUserData] = useState<Array<{
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    avatar: string
  }>>([])

  const header = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page: pagination.page,
      per_page: pagination.per_page
    }
  }

  const init = async() => {
    try {
      const getting = await apiService.get(urlService.endpoint.base, urlService.endpoint.path.users, header)
      console.log(getting.data)
      setPagination((prevState) => ({
        ...prevState,
        page: getting.data.page,
        total_page: getting.data.total_pages
      }))
      setUserData(getting.data.data)
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    init()
  }, [pagination.page, pagination.per_page])

  return (
    <main className="p-10 flex flex-col">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <p>Data User</p>
          <Select onValueChange={(value: string) => {
            setPagination((prevState) => ({
              ...prevState,
              per_page: parseInt(value),
              page: 1
            }))
          }}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table className="p-4">
          <Thead>
            <Tr className="border bg-neutral-100 text-left [&>th]:p-3">
              <Th>No</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userData && userData.map((data, index) => (
              <Tr className="border [&>td]:p-3" key={index}>
                <Td>{index + 1}</Td>
                <Td>{data.first_name}</Td>
                <Td>{data.last_name}</Td>
                <Td>{data.email}</Td>
                <Td>
                  <Button size="icon"
                    onClick={() => {
                      setDialogIsOpen(true)
                      setDetailUser(data)
                    }}
                  ><Icon icon="solar:eye-broken" /></Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <div className="p-3 flex justify-end items-center gap-2">
          <p>Page : {pagination.page} / {pagination.total_page}</p>
          <Button size="icon"
            onClick={() => {
              if(pagination.page > 1) {
                setPagination((prevState) => ({
                  ...prevState,
                  page: pagination.page - 1
                }))
              }
            }}
          ><Icon icon="formkit:left" /></Button>
          <Button size="icon"
            onClick={() => {
              if(pagination.page < pagination.total_page) {
                setPagination((prevState) => ({
                  ...prevState,
                  page: pagination.page + 1
                }))
              }
            }}
          ><Icon icon="formkit:right" /></Button>
        </div>
      </Card>
      <Dialog open={dialogIsOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail User</DialogTitle>
            {detailUser && (
              <div className="flex flex-col gap-5 justify-center items-center mt-20">
                <Avatar className="w-32 h-32 mt-5">
                  <AvatarImage src={detailUser.avatar} />
                </Avatar>
                <div className="text-center">
                  <p>{detailUser.first_name} {detailUser.last_name}</p>
                  <p className="text-gray-400">{detailUser.email}</p>
                </div>
              </div>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  )
}