import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Fileinput from "@/components/ui/Fileinput";
import DropZone from "./DropZone";

const FileinputPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFiles2, setSelectedFiles2] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleFileChange2 = (e) => {
    setSelectedFile2(e.target.files[0]);
  };
  const handleFileChangeMultiple = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => file);
    setSelectedFiles(filesArray);
  };
  const handleFileChangeMultiple2 = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => file);
    setSelectedFiles2(filesArray);
  };

  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <Card title="File Input Basic">
        <Fileinput
          name="basic"
          selectedFile={selectedFile}
          onChange={handleFileChange}
        />
      </Card>
      <Card title="Multiple Files">
        <Fileinput
          name="basic"
          multiple
          selectedFiles={selectedFiles}
          onChange={handleFileChangeMultiple}
        />
      </Card>
      <Card title="File Input Basic With Preview">
        <Fileinput
          name="basic"
          selectedFile={selectedFile2}
          onChange={handleFileChange2}
          preview
        />
      </Card>
      <Card title="Multiple Files With Preview">
        <Fileinput
          name="basic"
          selectedFiles={selectedFiles2}
          onChange={handleFileChangeMultiple2}
          multiple
          preview
        />
      </Card>
      <div className="xl:col-span-2 col-span-1">
        <Card title="File upload">
          <DropZone />
        </Card>
      </div>
      <Card title="Control sizing">
        <div className="space-y-3">
          <Fileinput placeholder="Large" className="h-[48px]" name="large" />
          <Fileinput placeholder="Default" name="default" />
          <Fileinput placeholder="Small" className="h-[32px]" name="small" />
        </div>
      </Card>
      <Card title="File Name Formatting">
        <Fileinput
          name="basic"
          badge
          selectedFile={selectedFile}
          onChange={handleFileChange}
        />
      </Card>
    </div>
  );
};

export default FileinputPage;
