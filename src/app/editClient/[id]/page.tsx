"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, notification } from "antd";
import { codes } from "country-calling-code";
import supabase from "@/components/SupaBase";
import { Navbar } from "@/components";
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";

const { Option } = Select;

const EditClientComp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState(null);

  const router = useRouter();
     const params = useParams()
     const {id} = params;
  const clientId = id; // Assuming ID is passed as a query parameter
  console.log("yyyyyyyyyyyyyyyyy",clientId)

  useEffect(() => {
    const fetchClientData = async () => {
      if (clientId) {
        const { data, error } = await supabase
          .from("clientlist")
          .select("*")
          .eq("client_id", clientId)
          .single();

        if (error) {
          notification.error({
            message: "Error",
            description: `Error fetching data: ${error.message}`,
          });
          return;
        }
        console.log("client data",data)
        setClientData(data);
        form.setFieldsValue(data);
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId, form]);

  const onFinish = async (values:any) => {
    try {
      const { error } = await supabase
        .from("clientlist")
        .update({
          company_name: values.company_name,
          gst_number: values.gst_number,
          address: values.address,
          city: values.city,
          state: values.state,
          country: values.country,
          contact_number: values.contact_number,
          website: values.website,
          pan_number: values.pan_number,
        })
        .eq("client_id", clientId);

      if (error) throw error;

      notification.success({
        message: "Success",
        description: "Client data updated successfully",
      });

      router.push('/clientlist');
    } catch (error: unknown) {
      if (error instanceof Error) {
        notification.error({
          message: "Error",
          description: `Error updating data: ${error.message}`,
        });
      } else {
        notification.error({
          message: "Error",
          description: "An unknown error occurred",
        });
      }
    }
    
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container w-10/12 mt-20">
        <div className="text-center">
          <h1 className="text-2xl">Edit Client</h1>
        </div>
        <h4 className="text-base text-gray-800">Edit Client Company</h4>
        <hr className="my-6" />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            company_name: "",
            gst_number: "",
            address: "",
            city: "",
            country: "",
            state: "",
            contact_number: "",
            website: "",
            pan_number: "",
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              name="company_name"
              label="Company Name"
              rules={[{ required: true, message: "Enter Client Company" }]}
            >
              <Input placeholder="Enter Company Name" />
            </Form.Item>

            <Form.Item
              name="gst_number"
              label="GST Number"
              rules={[{ required: true, message: "Enter GST Number" }]}
            >
              <Input placeholder="Enter GST Number" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Enter Client Address" }]}
            >
              <Input placeholder="Enter Address" />
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Enter Client City" }]}
            >
              <Input placeholder="Enter City" />
            </Form.Item>

            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "Enter Client State" }]}
            >
              <Input placeholder="Enter State" />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: "Enter Client Country" }]}
            >
              <Select placeholder="Select Country">
                {codes.map((country) => (
                  <Option key={country.country} value={country.country}>
                    {country.country}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="contact_number"
              label="Contact Number"
              rules={[{ required: true, message: "Enter Contact Number" }]}
            >
              <Input placeholder="Enter Contact Number" />
            </Form.Item>

            <Form.Item
              name="website"
              label="Website"
              rules={[{ required: true, message: "Enter Website" }]}
            >
              <Input placeholder="Enter Website" />
            </Form.Item>

            <Form.Item
              name="pan_number"
              label="Pan Number"
              rules={[{ required: true, message: "Enter Pan Number" }]}
            >
              <Input placeholder="Enter Pan Number" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{backgroundColor:"blue"}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditClientComp;
