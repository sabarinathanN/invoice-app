import React from "react";
import { Form, Input, Select, Button, notification } from "antd";
import { codes } from "country-calling-code";
import supabase from "../SupaBase";

const { Option } = Select;

interface FormValues {
  clientCompany: string;
  clientGst: string;
  clientAddress: string;
  clientCity: string;
  clientState: string;
  clientCountry: string;
  contactNumber: string;
  website: string;
  panNumber: string;
}

const CreateClientComp: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: FormValues) => {
    try {
      const { data: clientData, error: clientError } = await supabase
        .from("clientlist")
        .insert({
          client_id: Math.floor(1000 + Math.random() * 9000 + 2),
          company_name: values.clientCompany,
          gst_number: values.clientGst,
          address: values.clientAddress,
          city: values.clientCity,
          state: values.clientState,
          country: values.clientCountry,
          contact_number: values.contactNumber,
          website: values.website,
          pan_number: values.panNumber,
        })
        .select();

      if (clientError) throw clientError;

      notification.success({
        message: "Success",
        description: "Client data inserted successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        notification.error({
          message: "Error",
          description: `Error inserting data: ${error.message}`,
        });
      } else {
        notification.error({
          message: "Error",
          description: "An unexpected error occurred",
        });
      }
    }
  };

  return (
    <>
      <h4 className="text-base text-gray-800">Add Client Company</h4>
      <hr className="my-6" />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          clientCompany: "",
          clientGst: "",
          clientAddress: "",
          clientCity: "",
          clientCountry: "",
          clientState: "",
          contactNumber: "",
          website: "",
          panNumber: "",
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <Form.Item
            name="clientCompany"
            label="Company Name"
            rules={[{ required: true, message: "Enter Client Company" }]}
          >
            <Input placeholder="Enter Company Name" />
          </Form.Item>

          <Form.Item
            name="clientGst"
            label="GST Number"
            rules={[{ required: true, message: "Enter GST Number" }]}
          >
            <Input placeholder="Enter GST Number" />
          </Form.Item>

          <Form.Item
            name="clientAddress"
            label="Address"
            rules={[{ required: true, message: "Enter Client Address" }]}
          >
            <Input placeholder="Enter Address" />
          </Form.Item>

          <Form.Item
            name="clientCity"
            label="City"
            rules={[{ required: true, message: "Enter Client City" }]}
          >
            <Input placeholder="Enter City" />
          </Form.Item>

          <Form.Item
            name="clientState"
            label="State"
            rules={[{ required: true, message: "Enter Client State" }]}
          >
            <Input placeholder="Enter State" />
          </Form.Item>

          <Form.Item
            name="clientCountry"
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
            name="contactNumber"
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
            name="panNumber"
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
    </>
  );
};

export default CreateClientComp;
