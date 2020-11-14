const grey50 = 'hsl(0, 0%, 50%)';
const white = 'hsl(0, 0%, 100%)';
const navy = '#2c436d';
const darknavy = '#343633';

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '2px',
    margin: '0 auto',
    maxWidth: '340px',
    boxShadow:
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },
  header: {
    position: 'relative',
  },
  description: {
    position: 'absolute',
    bottom: '3px',
    left: '10px',
  },
  content: {
    padding: '1px 10px',
  },
  category: {
    color: grey50,
    fontSize: '2px',
    lineHeight: '4px',
    textTransform: 'uppercase',
    textDecoration: 'none',
  },
  heading: {
    color: darknavy,
    fontSize: '26px',
    lineHeight: '5px',
    fontWeight: '400',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  label: {
    backgroundColor: navy,
    color: white,
    padding: '10px',
    fontSize: '11.75px',
    lineHeight: '2px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  media: {
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'left', // Video in centered text can mis-align
    paddingBottom: (9 / 16) * 100,
    verticalAlign: 'bottom',
    border: 0,
    maxWidth: '100%',
    width: 'auto',
    height: 'auto',
  },
  img: {
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
  },
};

export default styles;
