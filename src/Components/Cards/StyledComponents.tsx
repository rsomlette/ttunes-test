import { Link } from 'react-router-dom';
import { css } from 'styled-components';

import styled from 'src/lib/styled-component';

interface ISource {
  src: string;
}

export const DetailArtist = styled.div`
  margin-left: 15px;
`;

const wrapperCss = css`
  height: 240px;
  width: 160px;

  margin: 0 15px 25px 15px;
`;

export const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  ${wrapperCss}
`;

export const LinkWrapper = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  ${wrapperCss}

  text-decoration: none;
  background-color: transparent;
  transition: background-color 200ms linear;

  &:hover {
    background-color: ${({ theme }) => theme.colors.highlight};
  }
`;

export const CoverImage = styled.div<ISource>`
  width: 100%;
  height: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
`;

export const Title = styled.div`
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text};
  /* text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; */
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

  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color linear 0.3s;

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

export const ArtistContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  height: 100%;
`;

export const DateWrapper = styled(Subtitle)`
  margin-top: auto;
`;
