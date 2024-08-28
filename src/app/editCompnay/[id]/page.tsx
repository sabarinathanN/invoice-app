'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, Input, Select, Button, Upload, Image, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import supabase from '@/components/SupaBase';
import { Navbar } from '@/components';
import codes from 'country-calling-code'; // Assuming you import country codes from here
import { COMMON_REX } from '../../../constants/regex';

const { Option } = Select;

interface CompanyData {
  company_name: string;
  nick_name: string;
  contact_number: string;
  email: string;
  website: string;
  country: string;
  address: string;
  logo_url: string;
  lut_id: string;
  pan_number: string;
  state: string;
  gst_number: string;
  city: string;
  companyLogoFile?: File;
}

const EditCompany = () => {
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const [initialData, setInitialData] = useState<CompanyData>({
    company_name: '',
    nick_name: '',
    contact_number: '',
    email: '',
    website: '',
    country: '',
    address: '',
    logo_url: '',
    lut_id: '',
    pan_number: '',
    state: '',
    gst_number: '',
    city: '',
  });

  const getCompanyData = async (id: string) => {
    try {
      const { data: companyData, error: companyError } = await supabase
        .from('companylist')
        .select('*')
        .eq('id', id)
        .single();

      if (companyError) {
        throw companyError;
      }

      setInitialData(companyData as CompanyData);
      form.setFieldsValue(companyData);
    } catch (error) {
      console.error('Error fetching company data:', (error as Error).message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getCompanyData(params.id as string);
    }
  }, [params.id]);

  const handleFileChange = (info: any) => {
    if (info.fileList.length) {
      const file = info.fileList[0].originFileObj;
      setInitialData((prev) => ({
        ...prev,
        companyLogoFile: file,
      }));
    }
  };

  const onFinish = async (values: CompanyData) => {
    try {
      let companyLogoUrl = initialData.logo_url;
  
      if (initialData.companyLogoFile) {
        const file = initialData.companyLogoFile;
        const { data, error: uploadError } = await supabase.storage
          .from('company-logos')
          .upload(`public/${file.name}`, file);
  
        if (uploadError) throw uploadError;
  
        // Correctly use the path returned by Supabase
        companyLogoUrl = data?.path ?? companyLogoUrl;
      }
  
      const { error: updateError } = await supabase
        .from('companylist')
        .update({
          ...values,
          logo_url: companyLogoUrl,
        })
        .eq('id', params.id as string);
  
      if (updateError) {
        throw new Error(updateError.message);
      }
  
      notification.success({
        message: 'Success',
        description: 'Company updated successfully',
      });
      router.push('/company');
    } catch (err) {
      notification.error({
        message: 'Error',
        description: `Error updating company: ${(err as Error).message}`,
      });
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="flex h-full w-full items-center justify-center mt-[150px]">
        <Form
          form={form}
          onFinish={onFinish}
          className="shadow-md p-10 w-1/2 rounded-md"
          initialValues={initialData}
        >
          <h1 className="text-3xl font-bold mb-4">Edit Company</h1>
          <Form.Item name="company_name" label="Company Name" rules={[{ required: true, message: 'Please input company name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="nick_name" label="Nick Name" rules={[{ required: true, message: 'Please input nick name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input email!', type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="contact_number" label="Contact Number" rules={[{ required: true, message: 'Please input contact number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please select country!' }]}>
            <Select>
              {codes.map((code) => (
                <Option key={code.country} value={code.country}>
                  {code.country}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input address!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website" rules={[{ required: true, message: 'Please input website!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lut_id" label="LUT ID" rules={[{ required: true, message: 'Please input LUT ID!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="pan_number" label="PAN Number" rules={[{ required: true, message: 'Please input PAN Number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="state" label="State" rules={[{ required: true, message: 'Please input state!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gst_number" label="GST Number" rules={[{ required: true, message: 'Please input GST Number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please input city!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Current Company Logo">
            {initialData.logo_url && <Image src={initialData.logo_url} width={100} height={100} alt="Company Logo" />}
          </Form.Item>
          <Form.Item label="Upload New Company Logo">
            <Upload
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleFileChange}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditCompany;
