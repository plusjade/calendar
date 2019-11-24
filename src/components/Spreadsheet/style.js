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
  entryWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 30,
    borderBottom: '1px solid #e0e0e0',
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
    minWidth: 240,
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
    marginBottom: 8,
    minHeight: 10,
  },
  hashtag: {
    padding: '2px 4px',
    backgroundColor: '#eeeeee',
    borderRadius: 3,
  }
}
