import { jsPDF } from 'jspdf';
import { PERSONAL_INFO, PROJECTS, CERTIFICATIONS, EDUCATION_DATA } from '../data/portfolioData';

export const downloadResumePdf = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > 280) {
      doc.addPage();
      y = 14;
    }
  };

  // Header: Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(20, 30, 55);
  doc.text(PERSONAL_INFO.name.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  y += 5.5;

  // Subtitle
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(70, 80, 100);
  doc.text('BCA STUDENT • ASPIRING DATA ANALYST & SOFTWARE DEVELOPER', pageWidth / 2, y, { align: 'center' });
  y += 5;

  // Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);
  const contactLine = `${PERSONAL_INFO.phone}  |  ${PERSONAL_INFO.email}  |  ${PERSONAL_INFO.location}`;
  doc.text(contactLine, pageWidth / 2, y, { align: 'center' });
  y += 4;
  const webLine = `LinkedIn: ${PERSONAL_INFO.linkedinUrl}  |  GitHub: ${PERSONAL_INFO.githubUrl}`;
  doc.text(webLine, pageWidth / 2, y, { align: 'center' });
  y += 3;

  // Divider Line
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4.5;

  const renderSectionHeader = (title: string) => {
    checkPageBreak(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), margin, y);
    y += 1.5;
    doc.setDrawColor(200, 205, 215);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
  };

  // 1. PROFESSIONAL SUMMARY
  renderSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 55, 65);
  const summaryText =
    'Motivated Bachelor of Computer Applications (BCA) student with foundational knowledge of Python, Java, C, C++, SQL, MS Excel and Data Analytics. Interested in transforming data into useful insights and developing practical technology solutions. Familiar with programming fundamentals, OOP concepts, databases, problem solving and basic web technologies. Currently building practical skills through academic learning, personal projects and continuous practice, with the goal of growing in the IT and Data Analytics field.';
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 3.8 + 2.5;

  // 2. CORE SKILLS
  renderSectionHeader('Core Skills');
  doc.setFontSize(8.5);
  const skills = [
    { label: 'Programming:', value: 'C • C++ • Java • Python • JavaScript / TypeScript' },
    { label: 'Data & Analytics:', value: 'SQL • MS Excel • Data Analytics Fundamentals • Data Interpretation' },
    { label: 'Computer / Tools:', value: 'Tally ERP • Web Technologies (HTML, CSS, React, Vite) • Git & GitHub' },
    { label: 'Problem Solving:', value: 'Logical Thinking • Analytical Thinking • Debugging • Quick Learning' },
    { label: 'Professional:', value: 'Communication • Teamwork • Adaptability • Time Management • Self Motivation' },
  ];

  skills.forEach((sk) => {
    checkPageBreak(5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 25, 40);
    doc.text(sk.label, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 55, 65);
    doc.text(sk.value, margin + 35, y);
    y += 4.2;
  });
  y += 2;

  // 3. EDUCATION
  renderSectionHeader('Education');
  EDUCATION_DATA.forEach((edu) => {
    checkPageBreak(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 25, 40);
    doc.text(edu.degree, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(edu.period, pageWidth - margin, y, { align: 'right' });
    y += 3.8;

    doc.setTextColor(70, 75, 85);
    doc.text(`${edu.institution}  —  Score / Status: ${edu.score}`, margin, y);
    y += 4.5;
  });
  y += 1;

  // 4. ACADEMIC & PERSONAL PROJECTS
  renderSectionHeader('Academic & Personal Projects');
  PROJECTS.forEach((proj) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(proj.title, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 110, 125);
    doc.text(proj.techStack.slice(0, 4).join(', '), pageWidth - margin, y, { align: 'right' });
    y += 3.6;

    doc.setFontSize(8.2);
    doc.setTextColor(60, 65, 75);
    const splitDesc = doc.splitTextToSize(proj.description, contentWidth);
    doc.text(splitDesc, margin, y);
    y += splitDesc.length * 3.4;

    // First 2 highlights
    proj.highlights.slice(0, 2).forEach((hl) => {
      checkPageBreak(4);
      doc.text(`•  ${hl}`, margin + 3, y);
      y += 3.4;
    });
    y += 2.2;
  });

  // 5. CERTIFICATIONS
  renderSectionHeader('Certifications');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 55, 65);
  CERTIFICATIONS.forEach((cert) => {
    checkPageBreak(5);
    doc.setFont('helvetica', 'bold');
    doc.text(`•  ${cert.title}`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`— ${cert.issuer}`, margin + 5 + doc.getTextWidth(`•  ${cert.title} `), y);
    y += 4;
  });
  y += 2;

  // 6. RELEVANT COURSEWORK & LANGUAGES
  renderSectionHeader('Relevant Coursework & Additional Information');
  doc.setFontSize(8.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 55, 65);
  const courseworkText =
    'Coursework: Object-Oriented Programming, Data Structures, Database / SQL Fundamentals, Computer Fundamentals, Web Basics, Data Analytics Fundamentals.';
  const splitCourse = doc.splitTextToSize(courseworkText, contentWidth);
  doc.text(splitCourse, margin, y);
  y += splitCourse.length * 3.5 + 2;

  checkPageBreak(6);
  doc.text('Languages: Hindi (Fluent)  •  English (Basic / Working)    |    Interests: Data Analytics, Programming, Technology', margin, y);
  y += 5.5;

  // 7. DECLARATION
  checkPageBreak(12);
  doc.setDrawColor(210, 215, 225);
  doc.setLineWidth(0.2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(110, 115, 125);
  doc.text('Declaration: I hereby declare that the information provided above is true to the best of my knowledge and belief.', margin, y);
  y += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(20, 25, 40);
  doc.text('Kuldeep Singh', pageWidth - margin, y, { align: 'right' });

  // Save PDF file download directly
  doc.save('Kuldeep_Singh_Resume.pdf');
};
