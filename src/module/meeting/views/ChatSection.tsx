import { Divider, Grid2, Paper } from '@mui/material';
import ChatMessageList from '../component/ChatMessageList';
import ChatInput from '../component/ChatInput';
import useRoomStore from '../../../hooks/useRoomStore';
import TitleSidebar from '../component/TitleSidebar';

const ChatSection = () => {
  const { isChatOpen, tougleChat } = useRoomStore();
  return (
    <Paper
      sx={{
        width: '320px',
        height: '100%',
        display: isChatOpen ? 'block' : 'none',
        overflow: 'hidden',
      }}
    >
      <Grid2
        container
        sx={{
          height: '100%',
        }}
        direction="column"
      >
        <Grid2 size="auto">
          <TitleSidebar label={'Chat Section'} onClose={tougleChat} />
        </Grid2>
        <Divider />
        <Grid2
          size="grow"
          sx={{
            overflow: 'hidden',
          }}
        >
          <ChatMessageList />
        </Grid2>

        <Divider />
        <Grid2 size="auto">
          <ChatInput />
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default ChatSection;
