import styled from 'src/lib/styled-component';

interface ISource {
  src: string;
}

export const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: 240px;
  width: 160px;

  margin-right: 30px;
  margin-bottom: 25px;
`;

export const CoverImage = styled.div<ISource>`
  width: 100%;
  height: 120px;
  background-image: url(${props => props.src});
  background-size: cover;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
`;

export const Title = styled.div`
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Subtitle = styled.div`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 10px;
`;

export const SpotifyPreview = styled.a`
  margin-top: auto;
  width: 100%;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 2px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background-color: ${({ theme }) => theme.colors.highlight};
  }
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  height: 90px;
`;

export const DateWrapper = styled(Subtitle)`
  margin-top: auto;
`;
