const styles = {
  main: {
    margin: 24,
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  profilesContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '16px',
  },
  skeletonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeleton: {
    position: 'relative',
    width: '200px',
    height: '300px',
  },
  noResults: {
    margin: '0 auto',
    textAlign: 'center',
    fontSize: '26px',
    padding: '25px',
    fontWeight: 400,
  },
};

export default styles;
