export default {
  app: {
    display: 'flex',
    width: '100%',
  },
  headerWrap: {
    height: '4vh',
  },
  headerTable: {
    borderSpacing: 12,
    marginLeft: 35,
  },
  entriesPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  dayCard: {
    flex: 1,
    // minHeight: '15vh',
    display: 'flex',
    flexDirection: 'column',
    // borderBottom: '1px solid #e0e0e0',
    // backgroundColor: '#FFF',
    // margin: '5px 10px',
    borderRadius: 5,
  },
  dayPanel: {
    height: '96vh',
    width: 30,
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    backgroundColor: '#f5f5f5',
  },
  dayWrap: {
    flex: 1,
    width: '100%',
    display: 'flex',
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
    transform: 'rotate(90deg) translate(-40px,0px)',
    transformOrigin: '-25px',
    color: '#616161',
  },
  hashtag: {
    padding: '2px 4px',
    border: '1px dashed #9E9E9E',
    borderRadius: 3,
    margin: '0 3px',
    fontSize: 12,
  },
  dayHeading: {
    fontWeight: 'bold',
    padding: 10,
    textTransform: 'uppercase',
    color: '#616161',
  },
  entryCard: {
    margin: '5px 10px',
    display: 'flex',
    //flexDirection: 'column',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
  },
  entryRow: {
    flex: 1,
    boxSizing: 'border-box',
  },
  categoryRow: {
    padding: 10,
  },
  TextRow: {
    flex: 2,
    padding: 10,
  },
  TagsRow: {
    marginTop: 5,
    // padding: 10,
  },

}
