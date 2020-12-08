import React, { useState } from 'react';
import ieee754 from '@/static/ieee-754-2008.pdf';
import { Document, Page, pdfjs } from 'react-pdf';
import Style from './index.module.scss';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default (props) => {
  const [totalPage, setTotalPage] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPage(numPages);
  };
  return (
    <>
      <div>
        <Document
          className={Style.doc}
          file={ieee754} //文件路径
          onLoadSuccess={onDocumentLoadSuccess} //成功加载文档后调用
          onLoadError={console.error} //加载失败时调用
          renderMode="canvas" //定义文档呈现的形式
          loading="正在努力加载中" //加载时提示语句
          externalLinkTarget="_blank"
        >
          {new Array(totalPage).fill('').map((item, index) => {
            return (
              <Page key={index + 1} pageNumber={index + 1} noData={' '} scale={2} width={400} />
            );
          })}
        </Document>
      </div>
    </>
  );
};
