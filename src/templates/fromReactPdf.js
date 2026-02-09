import React from 'react';
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  heading1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6
  },
  heading2: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10
  },
  content: {
    fontSize: 12,
    marginBottom: 10
  },
  divider: {
    height: 2,
    backgroundColor: '#ccc',
    marginBottom: 10
  },
  image: {
    width: 150,
    height: 150,
    objectFit: 'cover'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    columnGap: 10,
    marginBottom: 10
  }
});

// Create Document Component
const FromReactPdf = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.section}>
          <Text style={styles.heading1}>CURRICULUM VITAE</Text>
          <Text style={styles.heading1}>Sofia Juma</Text>
          <Text style={styles.content}>Marketing Intern</Text>
        </View>
        <View style={styles.grid}>
          {[
            { title: "Location:", value: "Dar es salaam" },
            { title: "Phone:", value: "+255 627 707 434" },
            { title: "Email:", value: "johnvchuma@gmail.com" },
            { title: "Nationality:", value: "Tanzanian" },
            { title: "Date of birth:", value: "12/05/1999" },
            { title: "Gender:", value: "Male" },
            { title: "Marital status:", value: "Married" },
          ].map((item, index) => (
            <View key={index} style={styles.grid}>
              <Text>{item.title}</Text>
              <Text>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Image src="https://t3.ftcdn.net/jpg/06/33/34/48/360_F_633344878_lbmmJtaj155fESZAX8oO1t8aA3T5REx9.jpg" style={styles.image} />
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading1}>PROFESSIONAL SUMMARY</Text>
        <View style={styles.divider} />
        <Text style={styles.content}>
          Deserunt cillum aliqua. adipisicing voluptate commodo. Officia ipsum deserunt exercitation laborum veniam nulla nostrud nisi consequat minim.
        </Text>
        <Text style={styles.heading2}>Career Objective</Text>
        <Text style={styles.content}>
          Deserunt cillum aliqua. adipisicing voluptate commodo. Officia ipsum deserunt exercitation laborum veniam nulla nostrud nisi consequat minim.
        </Text>
      </View>
    </Page>
  </Document>
);

export default FromReactPdf;
