import { useState, useEffect, useMemo } from 'react';
import { useModalContext, SelectAssetsModalProps } from '../Provider';
import { ETH_ASSET, getNfts, NftType } from '../../services/ethereum';
import { Asset, getAllUserAssetsByTemplate } from '../../services/assets';
import {
  Background,
  ModalBox,
  Section,
  CloseIconContainer,
  Title,
  HalfButton,
  Input,
  MagnifyingIconButton,
  InputContainer,
} from './Modal.styled';
import { EthNft, ProtonNft } from '../NftBridge/Nft';
import { ReactComponent as CloseIcon } from '../../public/close.svg';
import LoadingPage from '../LoadingPage';
import { ReactComponent as MagnifyingIcon } from '../../public/icon-light-search-24-px.svg';

export const SelectAssetsModal = (): JSX.Element => {
  const { closeModal, modalProps } = useModalContext();

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ethAssets, setEthAssets] = useState<ETH_ASSET[]>([]);
  const [protonAssets, setProtonAssets] = useState<Asset[]>([]);
  const [selectedEthNft, setSelectedEthNft] = useState<ETH_ASSET | null>(null);
  const [selectedProtonNft, setSelectedProtonNft] = useState<Asset | null>(
    null
  );
  const [searchText, setSearchText] = useState<string>('');

  const {
    ethToProton,
    owner,
    nftType,
    selectedNfts,
    setSelectedNfts,
  } = modalProps as SelectAssetsModalProps;

  useEffect(() => {
    if (error) setError('');

    if (ethToProton) {
      fetchEthAssets();
    } else {
      fetchProtonAssets();
    }
  }, []);

  const fetchEthAssets = async () => {
    if (!owner) {
      return;
    }

    setIsLoading(true);
    const nfts = await getNfts(owner);
    setEthAssets(nfts);
    setIsLoading(false);
  };

  const filteredEthAssets = useMemo(() => {
    const filter = searchText.trim().toLowerCase();

    return ethAssets.filter((el) => {
      const matchesName =
        el.attributes.name?.trim()?.toLowerCase()?.indexOf(filter) > -1;
      const matchesType = el.tokenType?.toLowerCase() == nftType;
      let matchesContract = true;
      if (selectedNfts.length) {
        if (
          el.contractAddress.toLowerCase() !=
          selectedNfts[0].contractAddress.toLowerCase()
        ) {
          matchesContract = false;
        } else if (
          selectedNfts.find(
            (_) => _.tokenId.toLowerCase() == el.tokenId.toLowerCase()
          )
        ) {
          matchesContract = false;
        }
      }
      return matchesName && matchesType && matchesContract;
    });
  }, [searchText, ethAssets.length]);

  const filteredAtomicAssets = useMemo(() => {
    const filter = searchText.trim().toLowerCase();
    if (filter == '') {
      return protonAssets;
    }

    return protonAssets.filter((el) => {
      const matchesName = el.name?.trim()?.toLowerCase()?.indexOf(filter) > -1;
      const matchesCollection =
        el.collection?.name?.trim()?.toLowerCase()?.indexOf(filter) > -1;
      return matchesName || matchesCollection;
    });
  }, [searchText, protonAssets.length]);

  const fetchProtonAssets = async () => {
    if (owner) {
      setProtonAssets([]);

      setIsLoading(true);

      try {
        const assets = await getAllUserAssetsByTemplate(owner, undefined);
        // support assets that created by bridge.
        const filtered = assets.filter(
          (el) => el.collection.author == process.env.NEXT_PUBLIC_PRT_NFT_BRIDGE
        );
        setProtonAssets(filtered);

        setIsLoading(false);
      } catch (e) {
        console.warn(e.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <Background>
      {!isLoading ? (
        <ModalBox>
          <Section>
            <Title>
              Select&nbsp;
              {ethToProton &&
                (nftType === NftType.ERC_721 ? 'ERC721' : 'ERC1155')}
              {!ethToProton && 'Atomic Assets'}
            </Title>
            <CloseIconContainer role="button" onClick={closeModal}>
              <CloseIcon />
            </CloseIconContainer>
          </Section>

          <InputContainer>
            <MagnifyingIconButton>
              <MagnifyingIcon />
            </MagnifyingIconButton>
            <Input
              required
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputContainer>

          {ethToProton &&
            (filteredEthAssets.length ? (
              filteredEthAssets.map((ethAsset: ETH_ASSET, idx) => (
                <EthNft
                  data={ethAsset}
                  selectedNft={selectedEthNft}
                  setSelectedNft={setSelectedEthNft}
                  key={idx}
                />
              ))
            ) : (
              <div style={{ textAlign: 'center', fontSize: 20 }}>
                No NFTs found
              </div>
            ))}

          {!ethToProton &&
            (filteredAtomicAssets.length ? (
              filteredAtomicAssets.map((asset: Asset, idx) => (
                <ProtonNft
                  data={asset}
                  selectedNft={selectedProtonNft}
                  setSelectedNft={setSelectedProtonNft}
                  key={idx}
                />
              ))
            ) : (
              <div style={{ textAlign: 'center', fontSize: 20 }}>
                No NFTs found
              </div>
            ))}
          <br />

          <HalfButton
            margin="20px 0 0"
            disabled={
              (ethToProton && !selectedEthNft) ||
              (!ethToProton && !selectedProtonNft)
            }
            onClick={() => {
              setSelectedNfts(ethToProton ? selectedEthNft : selectedProtonNft);
              closeModal();
            }}>
            Add
          </HalfButton>
        </ModalBox>
      ) : (
        <LoadingPage></LoadingPage>
      )}
    </Background>
  );
};
