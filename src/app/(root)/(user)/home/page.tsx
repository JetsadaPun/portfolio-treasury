import React from 'react'
import Page1 from '../../../utils/page1';
import Page2 from '../../../utils/page2';
import Page3 from '../../../utils/page3';
import Page4 from '../../../utils/page4';
import CreateReview from '../../../utils/createreview';

const page = () => {
  return (
    <div>
      <Page1/>
      <Page2/>
      <Page3/>
      <Page4/>
      {/* <CreateReview/> */}
    </div>
  )
}

export default page