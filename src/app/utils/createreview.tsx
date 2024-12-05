import { useState } from 'react';

export default function CreateReview() {
  const [projectName, setProjectName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [projectImage, setProjectImage] = useState(null);
  const [projectLink, setProjectLink] = useState('');
  const [projectFile, setProjectFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ projectName, projectDetails, projectImage, projectLink, projectFile });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg rounded-lg">
      <div>
        <label>ชื่อโปรเจกต์</label>
        <input 
          type="text" 
          value={projectName} 
          onChange={(e) => setProjectName(e.target.value)} 
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>รายละเอียดเกี่ยวกับโปรเจกต์</label>
        <textarea 
          value={projectDetails} 
          onChange={(e) => setProjectDetails(e.target.value)} 
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>เพิ่มรูปภาพโปรเจกต์</label>
        <input 
          type="file" 
          onChange={(e) => setProjectImage(e.target.files[0])} 
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>เพิ่มลิงก์ไปยังงาน</label>
        <input 
          type="url" 
          value={projectLink} 
          onChange={(e) => setProjectLink(e.target.value)} 
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>เอกสารเกี่ยวกับโปรเจกต์</label>
        <input 
          type="file" 
          onChange={(e) => setProjectFile(e.target.files[0])} 
          className="border p-2 w-full"
        />
      </div>

      <button type="submit" className="bg-green-500 text-white p-2 mt-4 rounded">
        ยืนยัน
      </button>
    </form>
  );
}
