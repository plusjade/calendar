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
  entryWrap: {
    flex: 1,
    // minHeight: '15vh',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    borderBottom: '1px solid #9e9e9e',
    backgroundColor: '#FFF',
  },
  entryTable: {
    borderSpacing: 12,
  },
  th: {
    textAlign: 'left',
    minWidth: 240,
  },
  td: {
    // minWidth: 240,
    // border: '1px solid #e0e0e0',
    verticalAlign: 'top',
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
  input: {
    border: 0,
    // borderBottom: '1px dashed #757575',
    boxSizing: 'border-box',
    // padding: '8px 8px 8px 0',
    // borderRadius: 5,
  },
  tagsWrap: {
  },
  hashtag: {
    padding: '2px 4px',
    backgroundColor: '#eeeeee',
    borderRadius: 3,
  },
  dayHeading: {
    fontWeight: 'bold',
    padding: 10,
    textTransform: 'uppercase',
  },
}
