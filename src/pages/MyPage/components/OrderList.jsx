import styled from '@emotion/styled';
import CurrentCategory from './CurrentCategory';

export default function OrderList() {
  const user = {
    orders: [
      {
        id: crypto.randomUUID(),
        productName: '상품명1',
        totalPrice: 100000,
        items: ['https://picsum.photos/60/60?random=1'],
        status: '배송중',
      },
      {
        id: crypto.randomUUID(),
        productName: '상품명2',
        totalPrice: 150000,
        items: [
          'https://picsum.photos/60/60?random=1',
          'https://picsum.photos/60/60?random=2',
          'https://picsum.photos/60/60?random=3',
        ],
        status: '결제완료',
      },
      {
        id: crypto.randomUUID(),
        productName: '상품명3',
        totalPrice: 200000,
        items: [
          'https://picsum.photos/60/60?random=1',
          'https://picsum.photos/60/60?random=2',
          'https://picsum.photos/60/60?random=3',
          'https://picsum.photos/60/60?random=4',
          'https://picsum.photos/60/60?random=5',
        ],
        status: '배송완료',
      },
    ],
  };
  return (
    <CategoryWrap>
      <OrderedList>
        {user?.orders.map((order) => (
          <li key={order.id}>
            <ItemInfo>
              <p>ORD-{order.id.slice(0, 8).toUpperCase()}</p>
              <ImgWrap>
                {order.items.slice(0, 2).map((item) => (
                  <img key={item} src={item} alt="주문 상품 이미지" />
                ))}
                {order.items.length - 2 > 0 ? <p>+{order.items.length - 2}</p> : null}
              </ImgWrap>
              <PriceSection>
                합계 <span>{order.totalPrice.toLocaleString()}원</span>
              </PriceSection>
            </ItemInfo>
            <ShippingInfo>
              <p>{order.status}</p>
              <ShippingBtns>
                {order.status === '결제완료' && <button>주문 취소</button>}
                {order.status === '배송중' || order.status === '배송완료' ? (
                  <button>배송 조회</button>
                ) : null}
                {order.status === '배송완료' && <button>교환,반품</button>}
              </ShippingBtns>
            </ShippingInfo>
          </li>
        ))}
      </OrderedList>
    </CategoryWrap>
  );
}

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const OrderedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};

  > li {
    padding: ${({ theme }) => theme.spacing[5]};
    display: flex;
    justify-content: space-between;
    border: 1px solid ${({ theme }) => theme.colors.primary + '33'};
    border-radius: ${({ theme }) => theme.radii.lg};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  > p:nth-of-type(1) {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }
`;

const ImgWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  position: relative;
  > img {
    border-radius: ${({ theme }) => theme.radii.md};
  }
  > p {
    width: 60px;
    height: 60px;
    border: 1px solid ${({ theme }) => theme.colors.textSecondary};
    border-radius: ${({ theme }) => theme.radii.md};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const PriceSection = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  > span {
    font-family: ${({ theme }) => theme.fontFamily.mono};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
  > p {
    text-align: right;
  }
`;

const ShippingBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
  > button {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[2]}`};
    border: 1px solid ${({ theme }) => theme.colors.textSecondary};
    border-radius: ${({ theme }) => theme.radii.pill};
  }
`;
