export default {
  app: {
    display: 'flex',
    height: '96vh',
  },
  headerWrap: {
    height: '4vh',
  },
  headerTable: {
    borderSpacing: 12,
    marginLeft: 35,
  },
  entriesPanel: {
    height: '96vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  entriesWrap: {
    flex: 1,
    display: 'flex',
    // alignItems: 'center',
    marginLeft: 30,
    // flexDirection: 'column'
    // borderBottom: '1px solid #e0e0e0',
    // backgroundColor: '#FFF',
  },
  entryRow: {
    display: 'flex',
  },
  th: {
    textAlign: 'left',
    minWidth: 200,
  },
  entryCard: {
    minWidth: 200,
    margin: '20px 10px',
  },
  entryText: {
    backgroundColor: '#F5F5F5',
    minHeight: 20,
    borderRadius: 10,
    padding: 10,
  },
  entryTags: {
    marginTop: 8,
    minHeight: 10,
  },
  hashtag: {
    padding: '2px 4px',
    backgroundColor: '#eeeeee',
    borderRadius: 3,
    fontSize: 12,
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
    backgroundColor: '#E0E0E0',
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
    transform: 'rotate(90deg) translate(-40px,10px)',
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
}
