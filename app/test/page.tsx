import Link from 'next/link';
import React from 'react';

const AboutPage = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page</p>
      <Link href="/" legacyBehavior><a>Go back home</a></Link>
    </div>
  );
};

export default AboutPage;